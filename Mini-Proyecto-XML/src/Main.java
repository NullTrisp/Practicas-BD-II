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
