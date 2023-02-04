import userTypeDefs from "./user";
import conversationTypeDefs from "./conversation";

import merge from 'lodash.merge';

const typeDefs = merge({}, userTypeDefs, conversationTypeDefs)

export default typeDefs;
