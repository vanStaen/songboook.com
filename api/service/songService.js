const req = require("express/lib/request");
const { Song } = require("../../models/Song");
const getfirstResultGoogleSearch = require("../../helpers/getfirstResultGoogleSearch");

exports.songService = {
  async getAllSong() {
    return await Song.findAll({ order: [["id", "DESC"]] });
  },

  async getSongById(songId) {
    return await Song.findOne({
      where: {
        id: songId,
      },
    });
  },

  async deleteSong(songId) {
    try {
      await Song.destroy({
        where: {
          id: songId,
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error(
        `Error when deleting the song id#${songId} in the database!`
      );
    }
  },

  async addSong(input, userId) {
    const title = input.artist + "-" + input.song;
    const geniusurl = await getfirstResultGoogleSearch([
      '"' + input.artist.split(" ").join('","'),
      input.song.split(" ").join("', '") + '"',
      "lyrics",
      "genius",
    ]);
    try {
      const song = new Song({
        artist: input.artist,
        title: title,
        song: input.song,
        geniusurl: geniusurl,
        createdBy: userId,
        added: Date.now(),
      });
      return await song.save();
    } catch (err) {
      console.log(err);
    }
  },

  async updateSong(songId, data) {
    const updateFields = [];
    const updatableFields = [
      "active",
      "artist",
      "link",
      "tags",
      "title",
      "picurl",
      "videourl",
      "geniusurl",
      "song",
      "piano",
      "bass",
      "level",
      "lyrics",
    ];
    updatableFields.forEach((field) => {
      if (field in data) {
        updateFields[field] = data[field];
      }
    });
    try {
      const updatedSong = await Song.update(updateFields, {
        where: {
          id: songId,
        },
        returning: true,
        plain: true,
      });
      // updatedUser[0]: number or row udpated
      // updatedUser[1]: rows updated
      return updatedSong[1];
    } catch (err) {
      console.log(err);
    }
  },
};
