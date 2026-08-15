import type { Meta, StoryObj } from "@storybook/react";
import { ROAD_SIGN_COLOUR_OPTIONS } from "../WarningSign/roadSignColors";
import { DestinationSign } from "./DestinationSign";

const meta = {
  title: "Road Signs/RouteSign/DestinationSign",
  component: DestinationSign,
  tags: ["autodocs"],
  args: {
    text: ["Mosfellsbær"],
    textColour: "black",
    backgroundColour: "yellow",
    borderColour: "black",
    roadNumbers: [
      { text: "1", borderStyle: "dashed" },
      { text: "49" },
    ],
    arrow: "diagonalUpRight",
    arrowPosition: "end",
    rowHeight: 90,
  },
  argTypes: {
    textColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    backgroundColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    borderColour: {
      control: "select",
      options: ROAD_SIGN_COLOUR_OPTIONS,
    },
    arrow: {
      control: "select",
      options: ["up", "left", "right", "turnLeft", "turnRight", "diagonalUpLeft", "diagonalUpRight"],
    },
    arrowPosition: {
      control: "select",
      options: ["start", "end", "both"],
    },
    pointed: {
      control: "select",
      options: [undefined, "start", "end", "both"],
    },
    pointFilled: {
      control: "boolean",
    },
    textEndPadding: {
      control: { type: "number", min: 0, max: 100, step: 5 },
    },
    rowHeight: {
      control: { type: "number", min: 50, max: 200, step: 10 },
    },
  },
} satisfies Meta<typeof DestinationSign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    roadNumbers: [{
      "text": "1",
      "borderStyle": "dashed"
    }]
  },
};

/** Matches the reference artwork (https://upload.wikimedia.org/wikipedia/commons/0/0a/F05.51.svg): a single destination name centred alongside a dashed "1" box stacked above a solid "49" box, with a diagonal up-right arrow. */
export const ReferenceMatch: Story = {
  args: {},
};

/** No road numbers -- just a destination name and an arrow. */
export const NoRoadNumbers: Story = {
  args: { roadNumbers: [] },
};

/** No arrow. */
export const NoArrow: Story = {
  args: { arrow: undefined },
};

/** Multiple destination names, each lining up with its own road number below the last. */
export const MultipleLines: Story = {
  args: {
    text: ["Reykjavík", "Selfoss"],
    roadNumbers: [{ text: "1" }, { text: "1" }],
    arrow: "up",
  },
};

/** A left-pointing arrow, mirrored from the same base shape as `right`. */
export const LeftArrow: Story = {
  args: {
    arrow: "left",
    roadNumbers: [],
    arrowPosition: "start"
  },
};

/** Arrow drawn before the road numbers/text instead of after. */
export const ArrowAtStart: Story = {
  args: { arrow: "left", arrowPosition: "start" },
};

/**
 * The board's own outline points instead of drawing a separate arrow,
 * matching https://upload.wikimedia.org/wikipedia/commons/1/11/F01.11.svg.
 */
export const PointedEnd: Story = {
  args: {
    text: ["Vatnsnes"],
    roadNumbers: [{ text: "711" }],
    arrow: undefined,
    pointed: "end",
  },
};

/**
 * `pointed` with `pointFilled` -- the board's own outline stays a plain
 * rounded rectangle, and only the `backgroundColour` fill comes to a point,
 * with the corner(s) it would otherwise round off filled solid with
 * `borderColour` instead. Paired with `distanceNumber`, matching
 * https://upload.wikimedia.org/wikipedia/commons/e/ea/F03.51.svg.
 */
export const PointedFilledEnd: Story = {
  args: {
    text: ["Mosfellsbær"],
    roadNumbers: [{ text: "1" }],
    arrow: undefined,
    pointed: "end",
    pointFilled: true,
    distanceNumber: "7",
  },
};

/**
 * A `PointOfInterest` icon box in place of the `roadNumbers` column, with a
 * red border/text and white background, matching
 * https://upload.wikimedia.org/wikipedia/commons/3/3d/F04.11.svg.
 */
export const PointOfInterestPointedEnd: Story = {
  args: {
    text: ["Árbæjarsafn"],
    textColour: "red",
    backgroundColour: "white",
    borderColour: "red",
    roadNumbers: [],
    icons: [{ symbol: "PointOfInterest" }],
    arrow: undefined,
    pointed: "end",
    pointFilled: true,
    textEndPadding: 100
  },
};

/** One arrow drawn on each side of the content. */
export const ArrowAtBothEnds: Story = {
  args: { arrow: "up", arrowPosition: "both" },
};

/**
 * A vehicle pictogram box in place of a road number, e.g. for a ferry
 * route. Occupies the same footprint as a `RouteSignRoadNumber` box. The
 * `icon` accepts any `ServiceSignSymbol`: `FirstAidOrHospital`,
 * `PoliceStation`, `Pharmacy`, `Information`, `PublicTelephone`,
 * `PublicLavatory`, `RadioStation`, `PetrolStation`, `RepairOrWorkshop`,
 * `Restaurant`, `HotelOrMotel`, `Campsite`, `CaravanPark`, `Church`,
 * `Bank`, `ATM`, `Ferry`, `Airport`, `Car`, `Snowmobile`, `Bike`, `Boat`,
 * `Hospital`, `EmergencyShelter`, `EmergencyPhone`, `FireExtinguisher`,
 * `InformationBooth`, `Outhouse`, `WasteTankDischarge`, `TownCentre`,
 * `IndustrialPlace`, `VacationHouses`, `PlaceOfInterestIndoors`,
 * `PointOfInterest`, `HikingTrail`, `PicnicSite`, `Viewpoint`,
 * `ViewpointWithInformation`, `RubbishBin`, `RubbishContainer`,
 * `TyreRepair`, `BuffetOrConfectionery`, `RestaurantInPrivateHome`,
 * `Hostel`, `YouthHostel`, `RentalCabin`, `RefugeHut`,
 * `CookingFacilities`, `Shower`, `HotTub`, `LaundryFacilities`,
 * `MeetingFacilities`, `InternetAccess`, `SwimmingPool`,
 * `RecreationCentre`, `SportsField`, `HorseHire`, `HorseTrack`,
 * `HorseStables`, `HorsecartRental`, `Fishing`, `OceanFishing`,
 * `WhaleWatching`, `SkiLift`, `SkiLiftWithChair`, `CrossCountrySkiArea`,
 * `SnowcatTrips`, `GolfCourse`, `ShootingRange`, `WaterScooterRental`,
 * `WaterSkiing`, `RiverRafting`, `Cemetery`, `PostOffice`, `TouristShop`,
 * `Supermarket`, `Bakery`, `FoodKiosk`, `Handicrafts`, `Greenhouse`,
 * `IceCreamShop`, `ArtGallery`, `Library`, `Aquarium`,
 * `LivestockAnimalsPark`, `DogHotel`, `Veterinarian`, `MusicVenue`,
 * `BoatTrips`, `CommercialHarbour`, `AerodromeOrAirstrip`.
 */
export const RoadNumberSlotIcon: Story = {
  args: {
    text: ["Vestmannaeyjar"],
    roadNumbers: [{
      "icon": "Ferry"
    }],
    arrow: "right",
  },
};

/** A service-sign-style pictogram box beside one row's destination text, matching https://upload.wikimedia.org/wikipedia/commons/e/ea/F11.51.svg. `icons[0]` is left `undefined` so only the second row ("Þingvellir") gets an icon. */
export const WithIcon: Story = {
  args: {
    text: ["Reykjavík", "Þingvellir"],
    roadNumbers: [{ text: "1", borderStyle: "dashed" }, { text: "36" }],
    icons: [undefined, { symbol: "PetrolStation" }],
    arrow: "turnRight",
  },
};
