import { Participant } from '../../../backend/src/util/types';
// import { randomBytes } from 'crypto';


interface DateTimeFormatPartTypesRegistry {
    day: any
    hour: any
    minute: any
    month: any
    year: any
}

type DateTimeFormatPartTypes = keyof DateTimeFormatPartTypesRegistry;

export const formatUsernames = (
    participants: Array<Participant>,
    myUserId: string
): string => {
    const usernames = participants
        .filter((participant) => participant.id !== myUserId)
        .map((participant) => participant.username);

        // console.log(usernames, 'formatUsername')
        return usernames.join(", ");
}
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: DateTimeFormatPartTypesRegistry= { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
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
        // adding ${ampm} at the end creates another am/pm for some odd reason
      formattedDate = formattedDate.replace(/(\d{2}:\d{2})/, `${hours}:${minutes}`);
    }
  
    return formattedDate;
  }
  

  // export class CustomObjectID {
  //   private timestamp: string;
  //   private machineId: string;
  //   private processId: string;
  //   private counter: string;
  
  //   constructor() {
  //     this.timestamp = Math.floor(Date.now() / 1000).toString(16);
  //     this.machineId = randomBytes(3).toString('hex');
  //     this.processId = Math.floor(window.performance.now()).toString(16).substring(-4)
  //     this.counter = randomBytes(3).toString('hex');
  //   }
  
  //   public toHexString(): string {
  //     return this.timestamp + this.machineId + this.processId + this.counter;
  //   }
  // }
