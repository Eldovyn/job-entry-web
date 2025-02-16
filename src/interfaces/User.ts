export interface User {
    avatar: string;
    created_at: number;
    email: string | null;
    is_active: boolean;
    is_admin: boolean;
    updated_at: number;
    user_id: string;
    username: string;
}