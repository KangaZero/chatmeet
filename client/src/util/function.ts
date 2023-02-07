import { Participant } from '../../../backend/src/util/types';

export const formatUsernames = (
    participants: Array<Participant>,
    myUserId: string
): string => {
    const usernames = participants
        .filter((participant) => participant.user.id !== myUserId)
        .map((participant) => participant.user.username);

        return usernames.join(", ");
}
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    let formattedDate = new Intl.DateTimeFormat('en-AU', options).format(date);
  
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    if (date.toDateString() === today.toDateString()) {
      formattedDate = `Today at ${hours}:${minutes} ${ampm}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      formattedDate = `Yesterday at ${hours}:${minutes} ${ampm}`;
    } else {
      formattedDate = formattedDate.replace(/(\d{2}:\d{2})/, `${hours}:${minutes} ${ampm}`);
    }
  
    return formattedDate;
  }
  