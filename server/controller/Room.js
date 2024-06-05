const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const { failed, customError } = require("../utils/errorHandler");
const { uploadToCloudinary } = require("../utils/uploadHandler");

// Significance of userId how to add room to linked hotel ?
exports.addRoom = async (req, res) => {
  try {
    // Fetching
    const userId = req.user.id;
    const { images } = req.files;
    const { title, type, beds, price, rooms, hotelId } = req.body;
    console.log(title, type, beds, price, rooms, hotelId);

    // Validation
    if (
      !title ||
      !type ||
      !beds ||
      !price ||
      !rooms ||
      !hotelId ||
      images.length === 0
    ) {
      throw customError("All fields are required", 404);
    }
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw customError("Unable to find the hotel", 404);
    }
    if (hotel.owner.toString() !== userId) {
      throw customError("This hotel doesn't belongs to you.", 403);
    }

    // Perform Task
    const newRoom = new Room({
      roomTitle: title,
      roomType: type,
      numberOfBed: beds,
      price: price,
      numberOfRooms: rooms,
    });

    images.forEach(async (index,image) => {
      const upload = await uploadToCloudinary(image, "RoomImage");
      newRoom.images.push(upload.secure_url);
    });

    const room = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: {
        rooms: room._id,
      },
    });

    // Send Response
    res.status(200).json({
      success: true,
      message: "Room Created Successfully",
    });
  } catch (err) {
     failed(res, err);
  }
};
exports.updateRoom = async (req, res) => {
  try {
    // Fetching
    const userId = req.user.id;
    const images = req.files;
    const { title, type, beds, price, rooms, hotelId, roomId, deleteImage } =
      req.body;
      
    // Validation
    if (!hotelId) {
      throw customError("Unknown hotel selection", 404);
    }
    if (!roomId) {
      throw customError("Unknown room selection", 404);
    }
    const hotel = await Hotel.findById(hotelId);
    console.log(hotel.rooms)
    if (!hotel) {
      throw customError("Unable to find the hotel", 404);
    }
    if (hotel.owner.toString() !== userId) {
      throw customError("This hotel doesn't belongs to you", 401);
    }
    if (!hotel.rooms.includes(roomId)) {
      throw customError("This Room doesn't belongs to selected hotel", 401);
    }
    if (
      !title &&
      !type &&
      !beds &&
      !price &&
      !rooms &&
      deleteImage.length == 0 &&
      images.length == 0
    ) {
      throw customError("Any one field is required to change", 404);
    }

    // Perform Task
    const room = await Room.findById(roomId);
    if (images.length !== 0) {
      const uploadPromises = images.map(async (image) => {
        const upload = await uploadToCloudinary(image, "RoomImage");
        return upload.secure_url;
      });

      const uploadedURLs = await Promise.all(uploadPromises);

      room.imageURL.push(...uploadedURLs);
    }
    if (deleteImage.length !== 0) {
      const updatedImageURLs = room.imageURL.filter(
        (url) => !deleteImage.includes(url)
      );
      room.imageURL = updatedImageURLs;
    }

    if (title) {
      room.roomTitle = title;
    }
    if (type) {
      room.roomType = type;
    }
    if (beds) {
      room.numberOfBed = beds;
    }
    if (price) {
      room.price = price;
    }
    if (rooms) {
      room.numberOfRooms = rooms;
    }

    const updatedRoom = await room.save();

    // Send Response
    res.status(200).json({
      success: true,
      message: "Successfully Updated a Room",
      updatedRoom,
    });
  } catch (err) {
    console.log(err)
    failed(res, err);
  }
};
exports.removeRoom = async (req, res) => {
  try {
    // Fetching
    const userId = req.user.id;
    const { roomId, hotelId } = req.body;

    // Validation
    if (!hotelId || !roomId) {
      throw customError("Unknown Selection", 404);
    }
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw customError("Unable to find the hotel", 404);
    }
    if (hotel.owner !== userId) {
      throw customError("Tere baap ka hotel hai kya... XD");
    }
    if (!hotel.room.includes(roomId)) {
      throw customError("This Room doesn't belongs to your hotel", 403);
    }

    // Perform Task
    await Room.findByIdAndDelete(roomId);
    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: {
        rooms: roomId,
      },
    });

    // Send Response
    res.status(200).json({
      success: true,
      message: "Successfully deleted the room",
    });
  } catch (err) {
    failed(res, err);
  }
};
