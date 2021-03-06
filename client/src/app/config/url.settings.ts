import { environment } from '../../environments/environment';

export class UrlSettings {
  /* Common values */

  // Base Url
  public static readonly API_ENDPOINT = environment.baseUrl + '/api/';

  // Suffixes
  public static readonly suffixRelation = 'rel';
  public static readonly count = 'count';
  public static readonly latest = 'latest';
  public static readonly print = 'print';

  /* Models endpoint */

  // Caregiver
  public static readonly caregiverModel = 'caregivers';
  
  // Dish
  public static readonly dishModel = 'dishes';
  public static readonly dishIngredients = 'ingredients';

  // Elderly
  public static readonly elderlyModel = 'elderlies';
  public static readonly elderlyMeals = 'meals';
  public static readonly elderlyMealsInit = 'init';
  public static readonly elderlyShoppingLists = 'shoppinglists';
  public static readonly elderlyShoppingListsDate = 'date';
  public static readonly elderlyShoppingListInit = 'init';
  public static readonly elderlyShoppingListIngredient = 'ingredients';
  public static readonly elderlyShoppingListsSendMail = 'sendMail';
  public static readonly elderlyReplaceStarter = 'replaceStarter';
  public static readonly elderlyReplaceDish = 'replaceDish';
  public static readonly elderlyCaregivers = 'caregivers';
  
  // Meal
  public static readonly mealModel = 'meals';

  // Starter
  public static readonly starterModel = 'starters';
  public static readonly starterIngredients = 'ingredients';
  
  // Skill
  public static readonly skillModel = 'skills';

  // User
  public static readonly userModel = 'users';
  public static readonly userAccessTokens = 'accessTokens';
  public static readonly userLogin = 'login';
  public static readonly userLogout = 'logout';
}
