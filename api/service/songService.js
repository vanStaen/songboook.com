const { Song } = require("../../models/Song");

exports.songService = {
  
  async getSongById(songId) {
    return await Song.findOne({
      where: {
        id: songId,
      },
    });
  },

};
