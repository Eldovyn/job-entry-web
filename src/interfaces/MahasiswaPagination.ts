import { UserForm } from "./userForm";

export interface MahasiswaPagination {
    current_page: number;
    items_per_page: number;
    limit: number | null;
    next_page: number | null;
    previous_page: number | null;
    total_items: number;
    total_pages: number;
    current_data: UserForm[];
}