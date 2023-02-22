import { ParticipantPopulated } from "./types";

export function userIsConversationParticipant(
 participants: Array<ParticipantPopulated>,
 userId: string
): boolean {
    return !!participants.find((p) => p.userId === userId);
}
