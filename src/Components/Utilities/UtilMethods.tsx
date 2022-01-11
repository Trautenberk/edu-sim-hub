export type Visibility = "visible" | "hidden";

export function convertToVisibility(value : boolean) : Visibility {
    return value ? "visible" : "hidden";
}