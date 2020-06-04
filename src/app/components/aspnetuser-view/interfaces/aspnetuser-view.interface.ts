
export interface IaspnetuserView {
      id: string | null;    // System.String
      email: string | null;    // System.String
      emailConfirmed: boolean;    // System.Boolean
      phoneNumber: string | null;    // System.String
      phoneNumberConfirmed: boolean;    // System.Boolean
      twoFactorEnabled: boolean;    // System.Boolean
      lockoutEndDateUtc: number | null;    // System.DateTime ?
      lockoutEnabled: boolean;    // System.Boolean
      accessFailedCount: number;    // System.Int32
      userName: string | null;    // System.String
}


