export interface createUserParams {
    sub_id: string;
    email: string;
    first_name: string,
    last_name: string
}

export interface mutateUserParams {
    sub_id: string;
    field: string;
    value: string | number;
}
