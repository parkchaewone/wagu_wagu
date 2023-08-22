const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { followers } = require('../models');

router.post('/:user_id/follow', authMiddleware, async (req, res, next) => {
  const { user_id } = res.locals.user;

  try {
    const targetUserId = req.params.user_id;

    const user = await followers.findByPk(user_id);
    const targetUser = await followers.findByPk(targetUserId);

    if (!targetUser) {
      return res.status(404).send('User not found');
    }

    const isAlreadyFollowing = await user.hasFollowing(targetUser);
    if (isAlreadyFollowing) {
      return res.status(409).send('Already following');
    }

    await user.addFollowing(targetUser);
    res.status(201).send('Followed');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
