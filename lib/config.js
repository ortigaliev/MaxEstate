const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "AGENCY"];
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.ordinary_enums = ["Y", "N"];

/* Estate enums */
exports.estate_collection_enums = [ "apartment","willa","house","office", "rent", "etc"];
exports.estate_status_enums = [ "PAUSED","PROCESS","DELETED"];
exports.estate_owner_enums = [ "one-room", "two-room","family","pent-house"];
exports.estate_rental_enums = ["전세", "반전세", "월세"];

/* exports.estate_collection_enums = [ "Apartment","Willa","House","Office","etc"];
exports.estate_status_enums = [ "PAUSED","PROCESS","DELETED"];
exports.estate_size_enums = [ "small", "normal","large","set"];
exports.estate_volume_enums = [0.5, 1, 1.2, 1.5, 2]; */