const router = require('express').Router();

const { createCardValidation } = require('../middlewares/validation/createCardValidation');
const { cardByIdValidation } = require('../middlewares/validation/cardByIdValidation');

const {
  getCards,
  createCard,
  removeCardById,
  putCardLike,
  removeCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', cardByIdValidation, removeCardById);
router.put('/:cardId/likes', cardByIdValidation, putCardLike);
router.delete('/:cardId/likes', cardByIdValidation, removeCardLike);

module.exports = router;
