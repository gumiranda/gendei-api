import { Query } from "@/application/types";
import { FollowData } from "@/slices/social-network/follow/entities";

export interface LoadFollowRepository {
  loadFollow(query: Query): Promise<FollowData | null>;
}
