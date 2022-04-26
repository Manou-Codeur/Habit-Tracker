export type habitsManagerType = (
  type: "ADD" | "UPDATE" | "DELETE",
  habitName: string,
  left: number | undefined
) => any;

export type habitsType = { name: string; left: number };
