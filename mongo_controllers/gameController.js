const NodeCache = require("node-cache");
const { Game, GameEvent, GameLineup } = require("../mongo_models");

// Initialize cache with a standard TTL (time to live) and check period
const gamesCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });
/**
 * Get a list of games with optional filters for search and sorting, and pagination.
 */
exports.getGames = async (req, res) => {
  // Parse query parameters for pagination, search, and sorting
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const searchQuery = req.query.searchQuery || "";
  const sort = req.query.sort || "";
  const skipIndex = page * limit;

  try {
    // Construct search query
    let query = {};
    if (searchQuery) {
      query = {
        $or: [
          { home_club_name: new RegExp(searchQuery, "i") },
          { away_club_name: new RegExp(searchQuery, "i") },
        ],
      };
    }

    // Construct sort options
    let sortOptions = {};
    if (sort) {
      const [sortField, sortOrder] = sort.split(":");
      sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
    }

    // Fetch games from the database with the constructed query and sorting options
    const games = await Game.find(query)
      .sort(sortOptions)
      .limit(limit)
      .skip(skipIndex);
    const total = await Game.countDocuments(query);

    // Respond with the fetched games and total count
    res.json({ data: games, total: total });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Get a list of games for a specific club with optional search, sort, and pagination.
 */
exports.getGamesByClub = async (req, res) => {
  // Extract parameters from the request
  const clubId = req.params.clubId;
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const searchQuery = req.query.search || "";
  const sort = req.query.sort || "";
  const skipIndex = page * limit;

  try {
    // Construct query for fetching games by club ID
    let query = {
      $or: [{ home_club_id: clubId }, { away_club_id: clubId }],
    };
    if (searchQuery) {
      query.$and = [
        {
          $or: [
            { home_club_name: new RegExp(searchQuery, "i") },
            { away_club_name: new RegExp(searchQuery, "i") },
          ],
        },
      ];
    }

    // Construct sort options
    let sortOptions = {};
    if (sort) {
      const [sortField, sortOrder] = sort.split(":");
      sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
    }

    // Fetch and respond with games for the specified club
    const games = await Game.find(query)
      .sort(sortOptions)
      .limit(limit)
      .skip(skipIndex);
    const total = await Game.countDocuments(query);

    res.json({ data: games, total: total });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Get detailed information about a specific game, including events and lineups. Cached results are used if available.
 */
exports.getGameDetails = async (req, res) => {
  const gameId = req.params.gameId;
  const cacheKey = `game_${gameId}`;

  // Attempt to retrieve data from cache
  const cachedData = gamesCache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    // Fetch game details from the database
    const game = await Game.findOne({ game_id: gameId });

    if (!game) {
      return res.status(404).send("Game not found with ID: " + gameId);
    }

    // Fetch related game events and lineups
    const gameEvents = await GameEvent.find({ game_id: gameId });
    const gameLineups = await GameLineup.find({ game_id: gameId });

    // Combine game data with events and lineups
    const combinedGameData = {
      ...game.toObject(),
      game_events: gameEvents,
      game_lineups: gameLineups,
    };

    // Save combined data to cache and respond
    gamesCache.set(cacheKey, combinedGameData);
    res.json(combinedGameData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
