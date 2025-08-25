const { Song } = require("../../models/Song");

exports.randomService = {
    async getNeverPickedUpSong(checked) {
        if (checked) {
            return await Song.findAll({
                where: {
                    randomized: false,
                    checked,
                },
            });
        }
       return await Song.findAll({
            where: {
                randomized: false,
            },
        });
    },

    async getRandomNumber(max) {
        const random = Math.floor(Math.random() * (max + 1));
        return random;
    },

    async setSongToRandomizedToTrue(songId) {
        try {
            await Song.update(
                { randomized: true },
                { 
                    where: { id: songId},
                    returning: true,
                    plain: true,
                }
            );
        } catch (err) {
            console.log(err);
        }
    },
    
     async setAllSongToRandomizedToFalse(checked) {
        try {
            if (checked) {
                await Song.update({ randomized: false }, { where: { checked } });
            } else {
                await Song.update({ randomized: false });
            }
        } catch (err) {
            console.log(err);
        }
    },
};
