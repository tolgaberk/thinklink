const CONSTANTS = require("../constants");
const NOT_IMPLEMENTED = require("../helpers/notImplemented");
const UserModel = require("../models/UserModel");

const ENTITIES = {
  FAVORITE_BOOKS: "favoriteBooks",
  FAVORITE_SERIES: "favoriteSeries",
  FAVORITE_MOVIES: "favoriteMovies",
  LAST_WATCHED_MOVIES: "lastWatchedMovies",
  LAST_WATCHED_SERIES: "lastWatchedSeries",
  LAST_READ_BOOKS: "lastReadBooks",
};
const PROCESS_TYPES = {
  ADD_ITEM: "addItem",
  REMOVE_ITEM: "removeItem",
  ADD_ITEMS: "addItems",
};

const FAVORITE_ROUTES = [
  {
    name: "addFavoriteBook",
    param: "bookId",
    process: PROCESS_TYPES.ADD_ITEM,
    entity: ENTITIES.FAVORITE_BOOKS,
  },
  {
    name: "addFavoriteBooks",
    param: "books",
    process: PROCESS_TYPES.ADD_ITEMS,
    entity: ENTITIES.FAVORITE_BOOKS,
  },
  {
    name: "removeFavoriteBook",
    param: "bookId",
    process: PROCESS_TYPES.REMOVE_ITEM,
    entity: ENTITIES.FAVORITE_BOOKS,
  },
  {
    name: "addFavoriteMovie",
    param: "movieId",
    process: PROCESS_TYPES.ADD_ITEM,
    entity: ENTITIES.FAVORITE_MOVIES,
  },
  {
    name: "addFavoriteMovies",
    param: "movies",
    process: PROCESS_TYPES.ADD_ITEMS,
    entity: ENTITIES.FAVORITE_MOVIES,
  },
  {
    name: "removeFavoriteMovie",
    param: "movieId",
    process: PROCESS_TYPES.REMOVE_ITEM,
    entity: ENTITIES.FAVORITE_MOVIES,
  },
  {
    name: "addFavoriteSerie",
    param: "serieId",
    process: PROCESS_TYPES.ADD_ITEM,
    entity: ENTITIES.FAVORITE_SERIES,
  },
  {
    name: "addFavoriteSeries",
    param: "series",
    process: PROCESS_TYPES.ADD_ITEMS,
    entity: ENTITIES.FAVORITE_SERIES,
  },
  {
    name: "removeFavoriteSerie",
    param: "serieId",
    process: PROCESS_TYPES.REMOVE_ITEM,
    entity: ENTITIES.FAVORITE_SERIES,
  },
];

const LAST_ENTITY_ROUTES = [
  {
    name: "addToLastReadBooks",
    param: "books",
    process: PROCESS_TYPES.ADD_ITEMS,
    entity: ENTITIES.LAST_READ_BOOKS,
  },
  {
    name: "removeFromLastReadBooks",
    param: "bookId",
    process: PROCESS_TYPES.REMOVE_ITEM,
    entity: ENTITIES.LAST_READ_BOOKS,
  },
  {
    name: "addToLastWatchedMovies",
    param: "movies",
    process: PROCESS_TYPES.ADD_ITEMS,
    entity: ENTITIES.LAST_WATCHED_MOVIES,
  },
  {
    name: "removeFromLastWatchedMovies",
    param: "movieId",
    process: PROCESS_TYPES.REMOVE_ITEM,
    entity: ENTITIES.LAST_WATCHED_MOVIES,
  },
  {
    name: "addToLastWatchedSeries",
    param: "series",
    process: PROCESS_TYPES.ADD_ITEMS,
    entity: ENTITIES.LAST_WATCHED_SERIES,
  },
  {
    name: "removeFromLastWatchedSeries",
    param: "serieId",
    process: PROCESS_TYPES.REMOVE_ITEM,
    entity: ENTITIES.LAST_WATCHED_SERIES,
  },
];
const UserFavoriteController = {};

LAST_ENTITY_ROUTES.map(({ name, process, entity, param }) => {
  UserFavoriteController[name] = async function (req, res) {
    const { userId } = req.body;
    const user = await UserModel.findById(userId).exec();
    try {
      switch (process) {
        case PROCESS_TYPES.ADD_ITEMS:
          if (
            user[entity].length + req.body[param].length <=
            CONSTANTS.LAST_WATCHED_MAX_COUNT
          ) {
            user[entity] = addItemsToArray(user[entity], req.body[param]);
            user.save();
            res.status(200).json({ message: "success", relatedObj: user });
          } else {
            res.status(200),
              json({
                message: `Object could not be edited because entity ${entity} is already or will be (after this operation) at limit`,
              });
          }
          break;
        case PROCESS_TYPES.REMOVE_ITEM:
          user[entity] = removeItemFromArray(user[entity], req.body[param]);
          user.save();
          res.status(200).json({ message: "success", relatedObj: user });
          break;
        default:
          break;
      }
    } catch (e) {
      res.status(500).json({
        error: e,
        message: "Could not " + processType + " to " + entity,
      });
    }
  };
});

FAVORITE_ROUTES.map(
  (route) =>
    (UserFavoriteController[route.name] = function (req, res) {
      const { userId } = req.body;
      editUserFavorites(
        userId,
        req.body[route.param],
        route.process,
        route.entity,
        res
      );
    })
);

module.exports = UserFavoriteController;

async function editUserFavorites(userId, param, processType, entity, res) {
  try {
    const user = await UserModel.findById(userId).exec();
    if (user[entity].length < CONSTANTS.FAVORITE_MAX_COUNT) {
      switch (processType) {
        case PROCESS_TYPES.ADD_ITEMS:
          param.length + user[entity].length < CONSTANTS.FAVORITE_MAX_COUNT
            ? (user[entity] = addItemsToArray(user[entity], param))
            : res.status(200).json({
                message: `Object could not be edited because entity ${entity} is already or will be (after this operation) at limit`,
              });
          break;
        case PROCESS_TYPES.REMOVE_ITEM:
          user[entity] = removeItemFromArray(user[entity], param);
          break;
        case PROCESS_TYPES.ADD_ITEM:
          user[entity] = addItemToArray(user[entity], param);
          break;
        default:
          break;
      }
      user.save();
      res.status(200).json({ message: "Success", relatedObj: user });
    } else {
      res.status(200),
        json({
          message: `Object could not be edited because entity ${entity} is already at limit`,
        });
    }
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Could not " + processType + " to " + entity,
    });
  }
}

function addItemToArray(array, item) {
  return removeDuplicates([...array, item]);
}
function addItemsToArray(array, items) {
  const newArray = removeDuplicates([...array, ...items]);
  return newArray;
}
function removeItemFromArray(array, removeId) {
  console.log(array, removeId);
  return array.filter((item) => item.toString() !== removeId);
}

function removeDuplicates(a) {
  var seen = {};
  return a.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}
