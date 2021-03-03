import java.util.Scanner;
import datatypes.Account;
import handlers.DataGenerator;

public class Main {
	public static void main(String... args) {
		Scanner in = new Scanner(System.in);
		String accountNum, pass;
		DataGenerator dataGenerator = new DataGenerator().generateData();
		boolean exit = false;

		System.out.println("Welcome to this bank account manager!");

		while (!exit) {
			System.out.println(
					"\nSelect the desired option: \n[1] -> Login to your account \n[2] -> Enter manager panel \n[3] -> Exit");
			switch (in.nextInt()) {

			case 1:
				System.out.println("Please input the account number: ");
				accountNum = in.next();
				System.out.println("Now the account password: ");
				pass = in.next();
				Account found = dataGenerator.login(accountNum, pass);
				if (found != null) {
					System.out.println("Logged in!");
					boolean exitUser = false;
					while (!exitUser) {
						System.out.println(found);
						System.out.println(
								"\nSelect the desired option: \n[1] -> Deposit cash \n[2] -> Retrieve cash \n[3] -> Logout");
						switch (in.nextInt()) {
						case 1:
							System.out.println("Please input the desired amount to deposit: ");
							found.deposit(in.nextDouble());
							System.out.println("Account credit updated!");
							break;

						case 2:
							System.out.println("Please input the desired amount to retrieve: ");
							if (found.retrieve(in.nextDouble())) {
								System.out.println("Retrieved cash successfully");
							} else {
								System.out.println("Couldn`t retrieve cash");
							}
							break;

						case 3:
							exitUser = !exitUser;
							System.err.println("\n\n\n\n");
							break;

						default:
							System.err.println("Choose a valid option!");
							break;
						}
					}
				} else {
					System.out.println("Error in credentials!");
				}
				break;
				
			case 2:
				System.out.println("Please enter manager password: ");
				if (dataGenerator.loginManager(in.next())) {
					in.nextLine();
					System.out.println("\nWelcome to the manager panel: ");
					boolean exitUser = false;
					while (!exitUser) {
						System.out.println(
								"\nSelect the desired option: \n[1] -> Execute custom query \n[2] -> Execute predefined queries \n[3] -> Exit");
						switch (in.nextInt()) {
						case 1:
							in.nextLine();
							System.out.println("Please input your desired query: ");
							String queryRes = dataGenerator.executeQuery(in.nextLine());
							System.out.println("\n" + queryRes + "\n");
							System.out.println("Do you want to save your query result? [y/n]");
							if (in.next().equals("y")) {
								System.out.println("Do you want to save it in xml or txt? [xml/txt]");
								String option = in.next();
								if (option.equals("xml")) {
									in.nextLine();
									System.out.println("Input file name: ");
									dataGenerator.storeQueryXml(queryRes, in.next());
								} else if (option.equals("txt")) {
									in.nextLine();
									System.out.println("Input file name: ");
									dataGenerator.storeQueryTxt(queryRes, in.next());
								} else {
									System.out.println("No valid option detected");
								}
							}
							break;
							
						case 2:
							String[] options = { "[1] -> Get accounts with credit greather than ",
									"[2] -> Get account data by account number", "[3] -> Get accounts by owner id",
									"[4] -> Get accounts with credit less than " };
							System.out.println("\n\nPlease choose a predefined query to execute: ");
							for (String option : options) {
								System.out.println(option);
							}
							switch (in.nextInt()) {
							case 1:
								in.nextLine();
								System.out.println("Insert the value: ");
								System.out.println(
										dataGenerator.executeQuery("for $x in /bank/accounts/account where $x/credit > "
												+ in.next() + " return $x"));
								break;
								
							case 2:
								in.nextLine();
								System.out.println("Insert the value: ");
								System.out.println(dataGenerator.executeQuery(
										"for $x in /bank/accounts/account where $x/@number = '" + in.next()
												+ "' return concat('owner: ', $x/owner, ' credit: ', $x/credit)"));
								break;
								
							case 3:
								in.nextLine();
								System.out.println("Insert the value: ");
								System.out.println(dataGenerator
										.executeQuery("for $x in /bank/accounts/account where $x/owner/@dni = '"
												+ in.next() + "' return $x"));
								break;
								
							case 4:
								in.nextLine();
								System.out.println("Insert the value: ");
								System.out.println(
										dataGenerator.executeQuery("for $x in /bank/accounts/account where $x/credit < "
												+ in.next() + " return $x"));
								break;
							default:
								System.out.println("No valid option recieved");
								break;
							}
							break;
							
						case 3:
							exitUser = !exitUser;
							System.err.println("\n\n\n\n");
							break;
							
						default:
							System.err.println("Choose a valid option!");
							break;
						}
					}
				} else {
					System.out.println("Incorrect credentials");
				}
				break;
				
			case 3:
				exit = !exit;
				in.close();
				dataGenerator.closeSession();
				break;
				
			default:
				System.err.println("Choose a valid option!");
			}
		}
	}
}
