import BaseModel from "@/models/utils/BaseModel";
import SchemaField from "@/models/utils/SchemaField";

export default class ViewService extends BaseModel {
  name!: string;
  schema!: Array<SchemaField>;
  listRule!: null | string;
  sql!: string;

  /**
   * @inheritdoc
   */
  load(data: { [key: string]: any }) {
    super.load(data);

    this.name = typeof data.name === "string" ? data.name : "";

    // rules
    this.listRule = typeof data.listRule === "string" ? data.listRule : null;

    // sql
    this.sql = typeof data.sql === "string" ? data.sql : "";

    // schema
    data.schema = Array.isArray(data.schema) ? data.schema : [];
    this.schema = [];
    for (let field of data.schema) {
      this.schema.push(new SchemaField(field));
    }
  }
}
