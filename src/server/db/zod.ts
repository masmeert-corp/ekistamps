import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";
import { schema } from ".";

// Region
export const regionSelectSchema = createSelectSchema(schema.region);
export const regionInsertSchema = createInsertSchema(schema.region);
export const regionUpdateSchema = createUpdateSchema(schema.region);
export type RegionSelect = z.infer<typeof regionSelectSchema>;
export type RegionInsert = z.infer<typeof regionInsertSchema>;
export type RegionUpdate = z.infer<typeof regionUpdateSchema>;

// Prefecture
export const prefectureSelectSchema = createSelectSchema(schema.prefecture);
export const prefectureInsertSchema = createInsertSchema(schema.prefecture);
export const prefectureUpdateSchema = createUpdateSchema(schema.prefecture);
export type PrefectureSelect = z.infer<typeof prefectureSelectSchema>;
export type PrefectureInsert = z.infer<typeof prefectureInsertSchema>;
export type PrefectureUpdate = z.infer<typeof prefectureUpdateSchema>;

// Company
export const companySelectSchema = createSelectSchema(schema.company);
export const companyInsertSchema = createInsertSchema(schema.company);
export const companyUpdateSchema = createUpdateSchema(schema.company);
export type CompanySelect = z.infer<typeof companySelectSchema>;
export type CompanyInsert = z.infer<typeof companyInsertSchema>;
export type CompanyUpdate = z.infer<typeof companyUpdateSchema>;

// Line
export const lineSelectSchema = createSelectSchema(schema.line);
export const lineInsertSchema = createInsertSchema(schema.line);
export const lineUpdateSchema = createUpdateSchema(schema.line);
export type LineSelect = z.infer<typeof lineSelectSchema>;
export type LineInsert = z.infer<typeof lineInsertSchema>;
export type LineUpdate = z.infer<typeof lineUpdateSchema>;

// Station
export const stationSelectSchema = createSelectSchema(schema.station);
export const stationInsertSchema = createInsertSchema(schema.station);
export const stationUpdateSchema = createUpdateSchema(schema.station);
export type StationSelect = z.infer<typeof stationSelectSchema>;
export type StationInsert = z.infer<typeof stationInsertSchema>;
export type StationUpdate = z.infer<typeof stationUpdateSchema>;

// StationLine
export const stationLineSelectSchema = createSelectSchema(schema.stationLine);
export const stationLineInsertSchema = createInsertSchema(schema.stationLine);
export const stationLineUpdateSchema = createUpdateSchema(schema.stationLine);
export type StationLineSelect = z.infer<typeof stationLineSelectSchema>;
export type StationLineInsert = z.infer<typeof stationLineInsertSchema>;
export type StationLineUpdate = z.infer<typeof stationLineUpdateSchema>;

// StampRally
export const stampRallySelectSchema = createSelectSchema(schema.stampRally);
export const stampRallyInsertSchema = createInsertSchema(schema.stampRally);
export const stampRallyUpdateSchema = createUpdateSchema(schema.stampRally);
export type StampRallySelect = z.infer<typeof stampRallySelectSchema>;
export type StampRallyInsert = z.infer<typeof stampRallyInsertSchema>;
export type StampRallyUpdate = z.infer<typeof stampRallyUpdateSchema>;

export const stampRallyOrganizerSelectSchema = createSelectSchema(
	schema.stampRallyOrganizer,
);
export const stampRallyOrganizerInsertSchema = createInsertSchema(
	schema.stampRallyOrganizer,
);
export const stampRallyOrganizerUpdateSchema = createUpdateSchema(
	schema.stampRallyOrganizer,
);
export type StampRallyOrganizerSelect = z.infer<
	typeof stampRallyOrganizerSelectSchema
>;
export type StampRallyOrganizerInsert = z.infer<
	typeof stampRallyOrganizerInsertSchema
>;
export type StampRallyOrganizerUpdate = z.infer<
	typeof stampRallyOrganizerUpdateSchema
>;

// Stamp
export const stampSelectSchema = createSelectSchema(schema.stamp);
export const stampInsertSchema = createInsertSchema(schema.stamp);
export const stampUpdateSchema = createUpdateSchema(schema.stamp);
export type StampSelect = z.infer<typeof stampSelectSchema>;
export type StampInsert = z.infer<typeof stampInsertSchema>;
export type StampUpdate = z.infer<typeof stampUpdateSchema>;
