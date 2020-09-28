const envHashMap = {};

function getEnv(key) {
  if (envHashMap[key]) return envHashMap[key];
  const val = process.env[key];
  if (val) {
    envHashMap[key] = val;
    return val;
  } else {
    throw new Error("Couldn't find " + key + " in environment");
  }
}

module.exports = getEnv;
