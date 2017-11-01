export class WisdomUser {
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    role: string;
    credentialsNonExpired: boolean;
    emailId: string;
    enabled: boolean;
    maxConcurrentSessions: number;
    username: string;

    constructor(accountNonExpired: boolean, accountNonLocked: boolean, role: string,
        credentialsNonExpired: boolean, emailId: string, enabled: boolean,
        maxConcurrentSessions: number, username: string) {
         this.accountNonExpired = accountNonExpired;
         this.accountNonLocked = accountNonLocked;
         this.role = role;
         this.credentialsNonExpired = credentialsNonExpired;
         this.emailId = emailId;
         this.enabled = enabled;
         this.maxConcurrentSessions = maxConcurrentSessions;
         this.username = username;
        }
}
