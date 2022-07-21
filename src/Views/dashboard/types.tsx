export type habitsManagerType = (
  type: "ADD" | "UPDATE" | "DELETE",
  habitName: string,
  left: number | undefined,
  skip: number | undefined
) => any;

export type habitsType = { name: string; left: number; skip: number };
