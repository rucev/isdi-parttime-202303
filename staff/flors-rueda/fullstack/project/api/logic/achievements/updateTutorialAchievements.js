const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');
const updateAchievementsProgress = require('../helpers/updateAchievementsProgress');

module.exports = (userId) => {
    validateId(userId, 'userId');

    return (async () => {
        const userAchievements = await Achievements.findOne({
            user: userId,
        });
        if (!userAchievements) throw new ExistenceError('user not found');

        const achievementCodeToUpdateValue = {
            T01: 1,
        }

        const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
            if (achievement.category === 'tutorial' && !achievement.isRankGoldReached) {
                const updateValue = achievementCodeToUpdateValue[achievement.code];
                if (updateValue) {
                    achievement.progress += updateValue;
                    return updateAchievementsProgress(achievement);
                }
                return achievement;
            }
            return achievement
        });
        await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });;
    })();
};