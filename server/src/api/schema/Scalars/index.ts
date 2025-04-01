import { asNexusMethod } from "nexus";
import {
  GraphQLObjectID,
  GraphQLPhoneNumber,
  GraphQLRGB,
  GraphQLPort,
  GraphQLPositiveFloat,
  GraphQLPositiveInt,
  GraphQLPostalCode,
  GraphQLRGBA,
  GraphQLRoutingNumber,
  GraphQLSESSN,
  GraphQLSafeInt,
  GraphQLSemVer,
  GraphQLTime,
  GraphQLTimeZone,
  GraphQLTimestamp,
  GraphQLURL,
  GraphQLUSCurrency,
  GraphQLUUID,
  GraphQLUnsignedFloat,
  GraphQLUnsignedInt,
  GraphQLUtcOffset,
  GraphQLVoid,
  GraphQLNonNegativeFloat,
  GraphQLNonNegativeInt,
  GraphQLNonPositiveFloat,
  GraphQLNonPositiveInt,
  GraphQLDateTime,
  GraphQLDate,
  GraphQLAccountNumber,
  GraphQLBigInt,
  GraphQLByte,
  GraphQLCountryCode,
  GraphQLCuid,
  GraphQLCurrency,
  GraphQLDID,
  GraphQLDateTimeISO,
  GraphQLDeweyDecimal,
  GraphQLDuration,
  GraphQLEmailAddress,
  GraphQLGUID,
  GraphQLHSL,
  GraphQLIBAN,
  GraphQLHSLA,
  GraphQLHexColorCode,
  GraphQLHexadecimal,
  GraphQLIP,
  GraphQLIPCPatent,
  GraphQLIPv4,
  GraphQLIPv6,
  GraphQLISBN,
  GraphQLISO8601Duration,
  GraphQLJSON,
  GraphQLJSONObject,
  GraphQLJWT,
  GraphQLLCCSubclass,
  GraphQLLatitude,
  GraphQLLocalDate,
  GraphQLLocalDateTime,
  GraphQLLocalEndTime,
  GraphQLLocalTime,
  GraphQLLocale,
  GraphQLLong,
  GraphQLLongitude,
  GraphQLMAC,
  GraphQLNegativeFloat,
  GraphQLNegativeInt,
  GraphQLNonEmptyString,
} from "graphql-scalars";
import { GraphQLUpload } from "graphql-upload-ts";

export const GQLUpload = asNexusMethod(GraphQLUpload, "Upload");
export const GQLDatetime = asNexusMethod(GraphQLDateTime, "Datetime");
export const GQLDate = asNexusMethod(GraphQLDate, "date");
export const GQLAccountNumber = asNexusMethod(
  GraphQLAccountNumber,
  "AccountNumber"
);
export const GQLBigInt = asNexusMethod(GraphQLBigInt, "BigInt");
export const GQLByte = asNexusMethod(GraphQLByte, "Byte");
export const GQLCountryCode = asNexusMethod(GraphQLCountryCode, "CountryCode");
export const GQLCuid = asNexusMethod(GraphQLCuid, "Cuid");
export const GQLCurrency = asNexusMethod(GraphQLCurrency, "Currency");
export const GQLDID = asNexusMethod(GraphQLDID, "DID");
export const GQLDateTimeISO = asNexusMethod(GraphQLDateTimeISO, "DateTimeISO");
export const GQLDeweyDecimal = asNexusMethod(
  GraphQLDeweyDecimal,
  "DeweyDecimal"
);
export const GQLDuration = asNexusMethod(GraphQLDuration, "Duration");
export const GQLEmailAddress = asNexusMethod(
  GraphQLEmailAddress,
  "EmailAddress"
);
export const GQLGUID = asNexusMethod(GraphQLGUID, "Guid");
export const GQLHSL = asNexusMethod(GraphQLHSL, "HSL");
export const GQLIBAN = asNexusMethod(GraphQLIBAN, "IBAN");
export const GQLHSLA = asNexusMethod(GraphQLHSLA, "HSLA");
export const GQLHexColorCode = asNexusMethod(
  GraphQLHexColorCode,
  "HexColorCode"
);
export const GQLHexadecimal = asNexusMethod(GraphQLHexadecimal, "Hexadecimal");
export const GQLIP = asNexusMethod(GraphQLIP, "IP");
export const GQLIPCPatent = asNexusMethod(GraphQLIPCPatent, "IPCPatent");
export const GQLIPV4 = asNexusMethod(GraphQLIPv4, "IPV4");
export const GQLIPV6 = asNexusMethod(GraphQLIPv6, "IPV6");
export const GQLISBN = asNexusMethod(GraphQLISBN, "ISBN");
export const GQLISO8601Duration = asNexusMethod(
  GraphQLISO8601Duration,
  "ISO8601Duration"
);
export const GQLJSON = asNexusMethod(GraphQLJSON, "JSON");
export const GQLJSONObject = asNexusMethod(GraphQLJSONObject, "JSONObject");
export const GQLJWT = asNexusMethod(GraphQLJWT, "JWT");
export const GQLLCCSubClass = asNexusMethod(GraphQLLCCSubclass, "LLCSubClass");
export const GQLLatitude = asNexusMethod(GraphQLLatitude, "Latitude");
export const GQLLocalDate = asNexusMethod(GraphQLLocalDate, "LocalDate");
export const GQLLcoalDateTime = asNexusMethod(
  GraphQLLocalDateTime,
  "LocalDateTime"
);
export const GQLLocalEndTime = asNexusMethod(
  GraphQLLocalEndTime,
  "LocalEndTime"
);
export const GQLLocalTime = asNexusMethod(GraphQLLocalTime, "LocalTime");
export const Locale = asNexusMethod(GraphQLLocale, "Locale");
export const GQLLong = asNexusMethod(GraphQLLong, "Long");
export const GQLLongitude = asNexusMethod(GraphQLLongitude, "Longitude");
export const GQLMAC = asNexusMethod(GraphQLMAC, "MAC");
export const GQLNegativeFloat = asNexusMethod(
  GraphQLNegativeFloat,
  "NegativeFloat"
);
export const GQLNegativeInt = asNexusMethod(GraphQLNegativeInt, "NegativeInt");
export const GQLNonEmptyString = asNexusMethod(
  GraphQLNonEmptyString,
  "NonEmptyString"
);
export const GQLNonNegativeFlaot = asNexusMethod(
  GraphQLNonNegativeFloat,
  "NonNegativeFloat"
);
export const GQLNonNegativeInt = asNexusMethod(
  GraphQLNonNegativeInt,
  "NonNegativeInt"
);
export const GQLNonPositiveFloat = asNexusMethod(
  GraphQLNonPositiveFloat,
  "NonPositiveFloat"
);
export const GQLNOnPositiveInt = asNexusMethod(
  GraphQLNonPositiveInt,
  "NonPositiveInt"
);
export const GQLObjectID = asNexusMethod(GraphQLObjectID, "ObjectID");
export const GQLPhoneNumber = asNexusMethod(GraphQLPhoneNumber, "PhoneNumber");
export const GQLRGB = asNexusMethod(GraphQLRGB, "RGB");
export const GQLPort = asNexusMethod(GraphQLPort, "Port");
export const GQLPositiveFlaot = asNexusMethod(
  GraphQLPositiveFloat,
  "PositiveFloat"
);
export const GQLPositiveInt = asNexusMethod(GraphQLPositiveInt, "PositiveInt");
export const GQLPostalCode = asNexusMethod(GraphQLPostalCode, "PostalCode");
export const GQLRGBA = asNexusMethod(GraphQLRGBA, "RGBA");
export const GQLRoutingNumber = asNexusMethod(
  GraphQLRoutingNumber,
  "RoutingNubmer"
);
export const GQLSESSN = asNexusMethod(GraphQLSESSN, "SESSN");
export const GQLSafeInt = asNexusMethod(GraphQLSafeInt, "SafeInt");
export const GQLSemVer = asNexusMethod(GraphQLSemVer, "SemVer");
export const GQLTime = asNexusMethod(GraphQLTime, "Time");
export const GQLTimezone = asNexusMethod(GraphQLTimeZone, "Timezone");
export const GQLTimestamp = asNexusMethod(GraphQLTimestamp, "Timestamp");
export const GQLURL = asNexusMethod(GraphQLURL, "URL");
export const GQLUSCurrency = asNexusMethod(GraphQLUSCurrency, "USCurrecny");
export const GQLUUID = asNexusMethod(GraphQLUUID, "UUID");
export const GQLUnsignedFloat = asNexusMethod(
  GraphQLUnsignedFloat,
  "UnsignedInt"
);
export const GQLUnsignedInt = asNexusMethod(GraphQLUnsignedInt, "UnsignedInt");
export const GQLUTCOffset = asNexusMethod(GraphQLUtcOffset, "UTCOffset");
export const GQLVoid = asNexusMethod(GraphQLVoid, "void");
