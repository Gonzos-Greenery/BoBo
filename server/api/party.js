const router = require('express').Router();
const {
  models: { User, Party, Genre },
} = require('../db');
const Sequelize = require('sequelize');
module.exports = router;

/*  */

router.get('/', async (req, res, next) => {
  try {
    const parties = await Party.findAll({
      include: {
        model: User,
        include: Genre,
      },
    });
    res.json(parties);
  } catch (err) {
    next(err);
  }
});

router.get('/:partyid', async (req, res, next) => {
  try {
    const party = await Party.findByPk(req.params.partyid, {
      include: {
        model: User,
        include: {
          model: Genre,
        },
      },
    });
    res.json(party);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newParty = await Party.create(req.body);
    res.send(newParty);
  } catch (error) {
    next(error);
  }
});

router.put('/addPartyHost/:partyId/:userId', async (req, res, next) => {
  try {
    const party = await Party.findByPk(req.params.partyId);
    const user = await User.findByPk(req.params.userId);
    await party.addUser(user, { through: { host: true } });
    res.send(true);
  } catch (err) {
    next(err);
  }
});

router.put('/addUsers/:partyId/:username', async (req, res, next) => {
  try {
    const party = await Party.findByPk(req.params.partyId);
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
    if (party) {
      await user.addParty(party);
      res.send(true);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:partyId', async (req, res, next) => {
  try {
    let partyToDelete = await Party.findByPk(req.params.partyId);
    if (!partyToDelete) {
      let err = new Error('Cannot remove party - no party found with that ID');
      err.status = 404;
      next(err);
    } else {
      const deletedParty = await Party.destroy({
        where: { id: req.params.partyId },
      });
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

router.get(`/all/:userId`, async (req, res, next) => {
  try {
    const party = await Party.findAll({
      include: {
        model: User,
        // where: { id: req.params.userId },
      },
    });
    //has to be a better way to eager load and filter. This is a quick fix for now
    const filterUser = party.filter((party) =>
      party.users.some((user) => `${user.id}` === req.params.userId)
    );

    res.json(filterUser);
  } catch (e) {
    next(e);
  }
});
