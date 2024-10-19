export interface Task {
    _id: string;
    taskName: string;
    description: string;
    userId: string;
}

export const  defaultTask = {
    _id: " ",
    taskName: " ",
    description: " ",
    userId: " "
}
export interface data {
data: Task,
message: string;
}