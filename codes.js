module.exports = {
    answer: [
        `#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;


int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    int numLines;
    int currNumber, total = 0;
    
    cin >> numLines;
    
    for (int i=0; i<numLines;i++) {
        cin >> currNumber;
        total += currNumber;
    }
    
    cout << total;
    
    return 0;
}`,

        `#include <bits/stdc++.h>
        using namespace std;
        int main() {
            int number_of_elements;
            cin >> number_of_elements;
            vector<int> arr(number_of_elements);
            int sum_of_array = 0;
            
            for(int i = 0; i < number_of_elements; i++) {
                cin >> arr[i];
                sum_of_array += arr[i];
                }
                cout<<sum_of_array<<endl;
                return 0;
                }`
                  ,
                  `#include <bits/stdc++.h>

                  using namespace std;
                  
                  string ltrim(const string &);
                  string rtrim(const string &);
                  vector<string> split(const string &);
                  
                  /*
                   * Complete the 'simpleArraySum' function below.
                   *
                   * The function is expected to return an INTEGER.
                   * The function accepts INTEGER_ARRAY ar as parameter.
                   */
                  
                  int simpleArraySum(vector<int> ar) {
                  int alice = 0;
                  int bob = 0;
                  vector<int>answer(2);
                    for(int i = 0; i < ar.size(); i++) {
                        if(a[i]>b[i])alice++;
                        else bob++;
                  }answer[0] = alice;
                  answer[1] = bob;
                  return answer;
                  
                  int main()
                  {
                      ofstream fout(getenv("OUTPUT_PATH"));
                  
                      string ar_count_temp;
                      getline(cin, ar_count_temp);
                  
                      int ar_count = stoi(ltrim(rtrim(ar_count_temp)));
                  
                      string ar_temp_temp;
                      getline(cin, ar_temp_temp);
                  
                      vector<string> ar_temp = split(rtrim(ar_temp_temp));
                  
                      vector<int> ar(ar_count);
                  
                      for (int i = 0; i < ar_count; i++) {
                          int ar_item = stoi(ar_temp[i]);
                  
                          ar[i] = ar_item;
                      }
                  
                      int result = simpleArraySum(ar);
                  
                      fout << result << "\n";
                  
                      fout.close();
                  
                      return 0;
                  }
                  
                  string ltrim(const string &str) {
                      string s(str);
                  
                      s.erase(
                          s.begin(),
                          find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
                      );
                  
                      return s;
                  }
                  
                  string rtrim(const string &str) {
                      string s(str);
                  
                      s.erase(
                          find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
                          s.end()
                      );
                  
                      return s;
                  }
                  
                  vector<string> split(const string &str) {
                      vector<string> tokens;
                  
                      string::size_type start = 0;
                      string::size_type end = 0;
                  
                      while ((end = str.find(" ", start)) != string::npos) {
                          tokens.push_back(str.substr(start, end - start));
                  
                          start = end + 1;
                      }
                  
                      tokens.push_back(str.substr(start));
                  
                      return tokens;

                  }`

    ]
}