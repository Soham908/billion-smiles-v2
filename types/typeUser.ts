
export interface IUser {
    _id: string;
    username: string;
    password: string;
    email: string;
    badgesEarned?: string[];
    userType: 'user' | 'ngo';

    // NGO-specific fields
    organizationName?: string,
    registrationId?: string,
}