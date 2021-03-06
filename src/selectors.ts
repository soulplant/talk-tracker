import { RepositionUserAction, TTAction } from "./actions";
import { TTState, Talk, User } from "./types";

// Get all the users we know about in their natural order.
export const getAllUsers = (state: TTState): User[] => {
  const user = state.entities.user;
  return user.order.map(id => user.byId[id]);
};

// Gets a map of users by id.
export const getUsersById = (state: TTState): { [id: string]: User } => {
  return state.entities.user.byId;
};

// Get all the talks we know about in their natural order.
export const getAllTalks = (state: TTState): Talk[] => {
  const talk = state.entities.talk;
  return talk.order.map(id => talk.byId[id]);
};

// Get a talk by its id.
// TODO(james): Make a generic version like getById(state, "talk", talkId): Talk.
export const getTalkById = (state: TTState, talkId: string): Talk => {
  return state.entities.talk.byId[talkId];
};

// Get a user by its id.
export const getUserById = (state: TTState, userId: string): User => {
  return state.entities.user.byId[userId];
};

// Get the ids of all talks.
export const getAllTalkIds = (state: TTState): string[] => {
  return state.entities.talk.order;
};

// Get the ids of all users.
export const getAllUserIds = (state: TTState): string[] => {
  return state.entities.user.order;
};

// Get the speaker of a given talk.
export const getSpeaker = (state: TTState, talkId: string): User => {
  const speakerId = state.entities.talk.byId[talkId].speakerId;
  return state.entities.user.byId[speakerId];
};

// Gets the next available local id for users.
export const getNextUserId = (state: TTState): string => {
  return state.entities.user.nextLocalId + "";
};

// Whether or not there are any users with a local id, implying the server won't recognise it.
export const getAnyLocalIds = (state: TTState): boolean => {
  const ids = Object.keys(state.entities.user.byId);
  return ids.findIndex(id => id.startsWith("-")) !== -1;
};

// Returns true if we are waiting on the server for anything right now.
export const getIsLoading = (state: TTState): boolean => {
  return (
    getAnyLocalIds(state) ||
    state.view.loading ||
    state.view.requestsInFlight > 0
  );
};

// Returns true if the given user is not currently saved on the server.
export const getIsUserLoading = (state: TTState, userId: string): boolean => {
  return getUserById(state, userId).id.startsWith("-");
};

// Returns true if the initial fetch is pending.
export const getIsInitialFetchPending = (state: TTState): boolean => {
  return state.view.loading;
};

// Get the next reposition request that is to be completed.
export const getNextPendingReposition = (
  state: TTState
): RepositionUserAction | null => {
  return state.requestQueue.pending[0] || null;
};

// Get the version of the ordered list of users we are operating at.
export const getVersion = (state: TTState): string => "1";

// Get whether or not there's a pending confirmation.
export const getIsPendingConfirmation = (state: TTState): boolean => {
  return state.view.confirm != null;
};

// Get the confirmation title to be shown in the confirm action dialog.
export const getConfirmationTitle = (state: TTState): string => {
  return state.view.confirm!.title;
};

// Get the confirmation message to be shown in the confirm action dialog.
export const getConfirmationMessage = (state: TTState): string => {
  return state.view.confirm!.message;
};

// Get the action that is pending confirmation.
export const getConfirmationAction = (state: TTState): TTAction => {
  return state.view.confirm!.action;
};

// Get whether edit mode is active or not.
export const getIsEditMode = (state: TTState): boolean => {
  return state.view.editMode;
};
