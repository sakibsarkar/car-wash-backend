"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBookings = exports.getAllBookings = exports.createBookingIntoDB = void 0;
const mongoose_1 = require("mongoose");
const catchAsyncError_1 = require("../../../utils/catchAsyncError");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const service_model_1 = __importDefault(require("../service/service.model"));
const slot_model_1 = __importDefault(require("../slot/slot.model"));
const booking_service_1 = require("./booking.service");
const { createBookingService, getAllBookingService, getUserBookingsService } = booking_service_1.bookingService;
exports.createBookingIntoDB = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const x = {
        serviceId: "60d9c4e4f3b4b544b8b8d1c5",
        slotId: "60d9c4e4f3b4b544b8b8d1c6",
        vehicleType: "car",
        vehicleBrand: "Toyota",
        vehicleModel: "Camry",
        manufacturingYear: 2020,
        registrationPlate: "ABC123",
    };
    const { body } = req;
    const user = req.user;
    const isValidObjId = (0, mongoose_1.isValidObjectId)(body.serviceId);
    if (!isValidObjId) {
        return (0, sendResponse_1.default)(res, {
            data: null,
            message: "invalid object id format",
            success: false,
            statusCode: 400,
        });
    }
    const isExist = yield service_model_1.default.findById(body.serviceId);
    if (!isExist) {
        return (0, sendResponse_1.default)(res, {
            message: "Service not found",
            data: null,
            statusCode: 404,
            success: false,
        });
    }
    const slot = yield slot_model_1.default.findById(body.slotId);
    if (!slot) {
        return (0, sendResponse_1.default)(res, {
            message: "slot not found",
            data: null,
            statusCode: 404,
            success: false,
        });
    }
    if (slot.isBooked !== "available") {
        (0, sendResponse_1.default)(res, {
            message: "this slot is not available for booking",
            data: null,
            statusCode: 404,
            success: false,
        });
    }
    const data = Object.assign({ customer: user._id, service: body.serviceId, slot: body.slotId }, body);
    const result = yield createBookingService(data);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Booking successful",
        data: result,
    });
}));
exports.getAllBookings = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield getAllBookingService();
    if (result.length > 0) {
        return (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "All bookings retrieved successfully",
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: [],
    });
}));
exports.getUserBookings = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield getUserBookingsService(user._id);
    if (result.length > 0) {
        return (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "User bookings retrieved successfully",
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: [],
    });
}));
