import java.util.Scanner;

import db_handler.DB;

public class Main {
	public static void main(String[] args) {
		/*
		 * for $x in /mondial/country return concat($x/@name, " ", $x/@government) for
		 * $x in /mondial/country where $x/@government = "Communist state" return
		 * concat($x/@name, " ", $x/@government) for $x in /mondial/country[name =
		 * 'Spain']/province return $x/city/name
		 */

		Scanner inAction = new Scanner(System.in), inQuery = new Scanner(System.in);
		String query, DB = "factbook";
		DB db = new DB(DB, "src/db_storage/" + DB + ".xml");
		boolean exit = false;
		int action;

		System.out.println("Welcome to this XMLDB manager!");
		while (!exit) {
			System.out.println("\nPlease input the desired action: " + "\n\n[1] Custom query \n\n[2] "
					+ "Execute predefined queries\n\n[3] Exit!");
			action = inAction.nextInt();
			switch (action) {
			case 1:
				System.out.println("Insert your query: \n");
				query = inQuery.nextLine();
				System.out.println("Your query returned: \n");
				db.query(query);
				break;
			case 2:

				break;
			case 3:
				db.DropDB();
				inAction.close();
				exit = !exit;
				System.out.println("\nBye Bye :D");
				break;
			default:
				System.err.println("Select a valid option!\n");
				break;
			}
			System.out.println("\n\n\n");
		}
	}
}
