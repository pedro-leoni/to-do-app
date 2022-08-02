export interface Task{
    id?: string,
    title: string,
    description: string,
    priority: number,
    state: string,
    term: string,
    created_on?: string
}