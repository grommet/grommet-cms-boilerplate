export type ContentBlockType = {
  image: string,
  id: string,
  edit: boolean,
  card?: ?{},
  content: string,
  layout: Array<{
    value: string,
    name: string
  }>
}
