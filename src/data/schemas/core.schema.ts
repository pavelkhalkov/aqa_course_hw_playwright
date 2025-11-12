export const obligatoryFieldsSchema = {
  IsSuccess: { type: "boolean" },
  ErrorMessage: {
    type: ["string", "null"],
  },
};

export const obligatoryRequredFields = ["IsSuccess", "ErrorMessage"];