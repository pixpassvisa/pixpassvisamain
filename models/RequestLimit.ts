import mongoose, { Schema } from "mongoose";
const schema = new Schema({ _id: String, until: { type: Date, required: true } });
schema.index({ until: 1 }, { expireAfterSeconds: 0 });
export default mongoose.models.RequestLimit || mongoose.model("RequestLimit", schema);
