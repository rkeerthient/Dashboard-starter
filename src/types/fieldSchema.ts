export interface Root {
  meta: Meta;
  response: Response;
}

export interface Meta {
  uuid: string;
  errors: Error[];
}
export interface Error {
  code: number;
  type: string;
  message: string;
  name: string;
}
export interface Response {
  $id: string;
  $schema: string;
  description: string;
  displayName: string;
  group: string;
  localization: string;
  type: Type;
  typeId: string;
}

export interface Type {
  listType: ListType;
  optionType: OptionType;
  stringType: StringType;
  decimalType: DecimalType;
}
export interface ListType {
  typeId: string;
  minLength?: number;
  maxLength?: number;
  type: Type2;
}
export interface Type2 {
  optionType: OptionType;
  stringType: StringType;
}
export interface OptionType {
  option: Option[];
}

export interface Option {
  displayName: string;
  textValue: string;
}
export interface StringType {
  stereotype: string;
}
export interface DecimalType {}
