
export type Lead = Readonly<{
  id: string;
  birthdate?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  celphone?: number;
  judicialRecords?: boolean;
  nationalRegistry?: boolean;
}>;
