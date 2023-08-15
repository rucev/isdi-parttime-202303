const {
    validators: { validateId, validateGameData },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');
const updateAchievementsProgress = require('../helpers/updateAchievementsProgress');

module.exports = async (userId, gameData) => {
    validateId(userId, 'userId');
    validateGameData(gameData);

    const { stonks, holes, bombs, life, cc } = gameData;

    const userAchievements = await Achievements.findOne({ user: userId });
    if (!userAchievements) throw new ExistenceError('user not found');

    const achievementCodeToUpdateValue = {
        G01: 1,
        G02: holes,
        G03: stonks,
        G04: bombs,
        G05: life >= 7 ? 1 : 0,
        G06: cc
    }

    const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
        if (achievement.category === 'game' && !achievement.isRankGoldReached) {
            const updateValue = achievementCodeToUpdateValue[achievement.code];
            if (updateValue) {
                achievement.progress += updateValue;
                return updateAchievementsProgress(achievement);
            }
            return achievement;
        }
        return achievement;
    });

    await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });
};
