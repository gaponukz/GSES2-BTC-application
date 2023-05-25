# GSES2 BTC Application

## API interface
| Method | Description | Input | Output |
| :--- | :--- | :--- | :--- |
| GET `/rate` | Get the current rate of btc to Hryvnia |  | `price: number` |
| POST `/subscribe` | Subscribe `gmail` to the newsletter with the BTC price | `gmail: string` |  |
| POST `/sendEmails` | Send the BTC price to all subscribers of the newsletter. |  |  |

## Some logic explanation
![image](https://github.com/gaponukz/GSES2-BTC-application/assets/49754258/474fd9cd-2d01-4642-aa65-18cb55323e9d)
