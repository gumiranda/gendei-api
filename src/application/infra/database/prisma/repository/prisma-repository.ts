// import { Repository } from "@/application/infra/contracts";
// import { prisma } from "../prisma";
// import { Prisma } from "@prisma/client";

// export class PrismaRepository extends Repository {
//   private tableName: any;
//   private name: any;

//   constructor(tableName: string) {
//     super();
//     this.tableName = (prisma as any)[tableName]; // Conecta a tabela do Prisma
//     this.name = tableName;
//   }

//   // Função auxiliar para mapear _id para id nas queries
//   private mapId(query: any) {
//     if (query && query._id) {
//       query.id = query._id;
//       delete query._id;
//     }
//     return query;
//   }
//   private mapSortOrder(sort: any) {
//     return Object.keys(sort).reduce((acc: any, key: string) => {
//       acc[key] = sort[key] === 1 ? "asc" : "desc";
//       return acc;
//     }, {});
//   }
//   // Função auxiliar para mapear id de volta para _id nos retornos
//   private mapReturnId(record: any) {
//     if (record && record.id) {
//       record._id = record.id;
//       delete record.id;
//     }
//     // if (record?.password) {
//     //   delete record.password;
//     // }
//     if (record?.user?.password) {
//       delete record.user.password;
//     }
//     return record;
//   }

//   // Função auxiliar para mapear id de volta para _id em listas de retornos
//   private mapReturnIds(records: any[]) {
//     return records?.map?.((record) => this.mapReturnId(record));
//   }

//   async add(data: any): Promise<any> {
//     const inserted = (await this.insertOne(data)) || {};
//     return this.mapReturnId(inserted);
//   }

//   async insertOne(data: any): Promise<any> {
//     const inserted = await this.tableName.create({
//       data,
//     });
//     return inserted;
//   }

//   async incrementOne(query: any, data: any): Promise<any> {
//     query = this.mapId(query);
//     const incremented = await this.tableName.update({
//       where: query,
//       data: {
//         ...Object.keys(data).reduce(
//           (acc: { [key: string]: any }, key) => {
//             acc[key] = { increment: data[key] };
//             return acc;
//           },
//           {} as { [key: string]: any }
//         ),
//       },
//     });
//     return this.mapReturnId(incremented);
//   }

//   async updateOne(_id: any, data: any): Promise<any> {
//     const query = this.mapId({ _id });
//     const updated = await this.tableName.update({
//       where: query,
//       data,
//     });
//     return this.mapReturnId(updated);
//   }

//   async update(query: any, data: any): Promise<any> {
//     query = this.mapId(query);
//     const updated = await this.tableName.update({
//       where: query,
//       data,
//     });
//     return this.mapReturnId(updated);
//   }

//   async upsertAndPush(query: any, data: any, pushData: any): Promise<any> {
//     query = this.mapId(query);
//     const keyToPush = Object.keys(pushData)[0];
//     const valueToPush = pushData[keyToPush];

//     const result = await this.tableName.upsert({
//       where: query,
//       update: {
//         [keyToPush]: {
//           push: valueToPush,
//         },
//       },
//       create: {
//         ...query,
//         ...data,
//       },
//     });
//     return this.mapReturnId(result);
//   }

//   async increment(query: any, data: any): Promise<any> {
//     query = this.mapId(query);
//     const incremented = await this.tableName.updateMany({
//       where: query,
//       data: {
//         ...Object.keys(data).reduce(
//           (acc: { [key: string]: any }, key) => {
//             acc[key] = { increment: data[key] };
//             return acc;
//           },
//           {} as { [key: string]: any }
//         ),
//       },
//     });
//     return incremented.count;
//   }

//   async deleteMany(query: any): Promise<any> {
//     query = this.mapId(query);
//     const deleted = await this.tableName.deleteMany({
//       where: query,
//     });
//     return deleted.count;
//   }

//   async deleteOne(fields: any): Promise<any> {
//     return this.deleteMany(fields);
//   }
//   exclude<T extends Record<string, any>, Key extends keyof T>(
//     object: T,
//     keys: Key[]
//   ): Omit<T, Key> {
//     return Object.fromEntries(
//       Object.entries(object).filter(([key]) => !keys.includes(key as Key))
//     ) as Omit<T, Key>;
//   }
//   getValidIncludeFields(model: any): string[] {
//     const modelFields = Prisma.dmmf.datamodel.models.find(
//       (m: any) => m.name === model
//     )?.fields;

//     return (
//       modelFields
//         ?.filter((field: any) => field.kind === "object")
//         .map((field: any) => field.name) || []
//     );
//   }

//   async getOne(query: any, options: any): Promise<any> {
//     query = this.mapId(query);
//     query = { where: query };

//     // Valida os campos da projeção (select)
//     if (options?.projection) {
//       const includedFields = Object.keys(options?.projection).filter(
//         (key) => options?.projection[key] === 1
//       );

//       if (includedFields.length > 0) {
//         query.select = {};
//         Object.keys(options?.projection).forEach((key) => {
//           query.select[key] = options?.projection[key] === 1; // Incluir campo se for 1
//         });
//       }
//     }

//     // Obtém dinamicamente os campos válidos do modelo associado à tabela
//     if (options?.include) {
//       const validIncludeFields = this.getValidIncludeFields(this.tableName.$name);

//       query.include = {};
//       Object.keys(options.include).forEach((key) => {
//         if (validIncludeFields.includes(key)) {
//           query.include[key] = options.include[key];
//         }
//       });
//     }

//     // Busca o registro no banco de dados
//     const record = await this.tableName.findFirst(query);

//     // Se houver projeção, filtra campos a serem excluídos
//     if (options?.projection && record?.id) {
//       const excludedFields = Object.keys(options?.projection).filter(
//         (key) => options?.projection[key] === 0
//       );
//       return this.mapReturnId(this.exclude(record, excludedFields));
//     }

//     return this.mapReturnId(record);
//   }
//   async getAll(): Promise<any[]> {
//     const records = await this.tableName.findMany();
//     return this.mapReturnIds(records);
//   }

//   async getPaginate(
//     page = 0,
//     fields: any,
//     sort: any,
//     limit = 10,
//     projection: any = {},
//     populate = null
//   ): Promise<any[]> {
//     const skip = (page - 1) * limit;
//     fields = this.mapId(fields);

//     const query: any = {
//       where: fields,
//       orderBy: this.mapSortOrder(sort),
//       take: limit,
//       skip,
//       include: {},
//     };
//     if (populate) {
//       const validIncludeFields = this.getValidIncludeFields(this.tableName.$name);

//       Object.keys(populate).forEach((key) => {
//         if (validIncludeFields.includes(key)) {
//           query.include[key] = populate[key];
//         }
//       });
//     } else {
//       delete query.include;
//     }
//     const queryFinal =
//       Object.keys(projection).length === 0
//         ? query
//         : {
//             ...query,
//             select: projection,
//           };

//     const records = await this.tableName.findMany(queryFinal);
//     return this.mapReturnIds(records);
//   }

//   async getCount(query: any): Promise<number> {
//     query = this.mapId(query);
//     const count = await this.tableName.count({
//       where: query,
//     });
//     return count;
//   }

//   async aggregate(query: any): Promise<any> {
//     query = this.mapId(query);
//     const result = await this.tableName.aggregate(query);
//     return result;
//   }
// }
