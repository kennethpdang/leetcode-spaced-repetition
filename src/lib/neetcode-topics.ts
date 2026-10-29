// The 18 topics on the NeetCode roadmap, in roadmap order, with the LeetCode problems NeetCode files under each one.
// Built from NeetCode's own problem list (github.com/neetcode-gh/leetcode, .problemSiteData.json), using its "pattern" field.
// A problem missing from every topic (a LeetCode-only problem) goes under "Other".

export interface TopicChoice {
  id: string;
  name: string;
}

export interface NeetcodeTopic extends TopicChoice {
  problemNumbers: number[];
}

export const OTHER_TOPIC_ID = "other";
export const OTHER_TOPIC_NAME = "Other";

export const NEETCODE_TOPICS: NeetcodeTopic[] = [
  {
    id: "arrays-and-hashing",
    name: "Arrays & Hashing",
    problemNumbers: [
      1, // Two Sum
      14, // Longest Common Prefix
      27, // Remove Element
      28, // Find The Index of The First Occurrence in a String
      36, // Valid Sudoku
      41, // First Missing Positive
      49, // Group Anagrams
      58, // Length of Last Word
      68, // Text Justification
      75, // Sort Colors
      118, // Pascals Triangle
      122, // Best Time to Buy And Sell Stock II
      128, // Longest Consecutive Sequence
      169, // Majority Element
      179, // Largest Number
      187, // Repeated DNA Sequences
      205, // Isomorphic Strings
      217, // Contains Duplicate
      238, // Product of Array Except Self
      242, // Valid Anagram
      271, // Encode and Decode Strings
      280, // Wiggle Sort
      290, // Word Pattern
      303, // Range Sum Query - Immutable
      304, // Range Sum Query 2D Immutable
      347, // Top K Frequent Elements
      380, // Insert Delete Get Random O(1)
      392, // Is Subsequence
      438, // Find All Anagrams in a String
      448, // Find All Numbers Disappeared in An Array
      496, // Next Greater Element I
      523, // Continuous Subarray Sum
      535, // Encode and Decode TinyURL
      554, // Brick Wall
      560, // Subarray Sum Equals K
      605, // Can Place Flowers
      665, // Non Decreasing Array
      705, // Design HashSet
      706, // Design HashMap
      724, // Find Pivot Index
      838, // Push Dominoes
      912, // Sort an Array
      929, // Unique Email Addresses
      1189, // Maximum Number of Balloons
      1299, // Replace Elements With Greatest Element On Right Side
      1396, // Design Underground System
      1461, // Check if a String Contains all Binary Codes of Size K
      1603, // Design Parking System
      1822, // Sign of An Array
      1929, // Concatenation of Array
      1930, // Unique Length 3 Palindromic Subsequences
      1963, // Minimum Number of Swaps to Make The String Balanced
      2001, // Number of Pairs of Interchangeable Rectangles
      2002, // Maximum Product of The Length of Two Palindromic Subsequences
      2017, // Grid Game
      2215, // Find the Difference of Two Arrays
      2306, // Naming a Company
      2348, // Number of Zero-Filled Subarrays
      2405, // Optimal Partition of String
      2483, // Minimum Penalty for a Shop
    ],
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    problemNumbers: [
      11, // Container With Most Water
      15, // 3Sum
      18, // 4Sum
      26, // Remove Duplicates From Sorted Array
      42, // Trapping Rain Water
      80, // Remove Duplicates From Sorted Array II
      88, // Merge Sorted Array
      125, // Valid Palindrome
      167, // Two Sum II Input Array Is Sorted
      189, // Rotate Array
      283, // Move Zeroes
      344, // Reverse String
      680, // Valid Palindrome II
      881, // Boats to Save People
      1498, // Number of Subsequences That Satisfy The Given Sum Condition
      1768, // Merge Strings Alternately
      1968, // Array With Elements Not Equal to Average of Neighbors
      1984, // Minimum Difference Between Highest And Lowest of K Scores
    ],
  },
  {
    id: "stack",
    name: "Stack",
    problemNumbers: [
      20, // Valid Parentheses
      22, // Generate Parentheses
      71, // Simplify Path
      84, // Largest Rectangle In Histogram
      150, // Evaluate Reverse Polish Notation
      155, // Min Stack
      225, // Implement Stack Using Queues
      394, // Decode String
      402, // Remove K Digits
      456, // 132 Pattern
      682, // Baseball Game
      735, // Asteroid Collision
      739, // Daily Temperatures
      853, // Car Fleet
      895, // Maximum Frequency Stack
      901, // Online Stock Span
      946, // Validate Stack Sequences
      1209, // Remove All Adjacent Duplicates In String II
      2390, // Removing Stars From a String
    ],
  },
  {
    id: "binary-search",
    name: "Binary Search",
    problemNumbers: [
      4, // Median of Two Sorted Arrays
      33, // Search In Rotated Sorted Array
      34, // Find First And Last Position of Element In Sorted Array
      35, // Search Insert Position
      69, // Sqrt(x)
      74, // Search a 2D Matrix
      81, // Search In Rotated Sorted Array II
      116, // Populating Next Right Pointers In Each Node
      153, // Find Minimum In Rotated Sorted Array
      162, // Find Peak Element
      367, // Valid Perfect Square
      374, // Guess Number Higher Or Lower
      410, // Split Array Largest Sum
      441, // Arranging Coins
      540, // Single Element in a Sorted Array
      704, // Binary Search
      875, // Koko Eating Bananas
      977, // Squares of a Sorted Array
      981, // Time Based Key Value Store
      1011, // Capacity to Ship Packages
      1268, // Search Suggestions System
      1898, // Maximum Number of Removable Characters
      2300, // Successful Pairs of Spells and Potions
      2616, // Minimize the Maximum Difference of Pairs
    ],
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    problemNumbers: [
      3, // Longest Substring Without Repeating Characters
      76, // Minimum Window Substring
      121, // Best Time to Buy And Sell Stock
      209, // Minimum Size Subarray Sum
      219, // Contains Duplicate II
      239, // Sliding Window Maximum
      424, // Longest Repeating Character Replacement
      567, // Permutation In String
      658, // Find K Closest Elements
      904, // Fruits into Basket
      1343, // Number of Sub Arrays of Size K and Avg Greater than or Equal to Threshold
      1456, // Maximum Number of Vowels in a Substring of Given Length
      1658, // Minimum Operations to Reduce X to Zero
      1838, // Frequency of The Most Frequent Element
      1888, // Minimum Number of Flips to Make The Binary String Alternating
    ],
  },
  {
    id: "linked-list",
    name: "Linked List",
    problemNumbers: [
      2, // Add Two Numbers
      19, // Remove Nth Node From End of List
      21, // Merge Two Sorted Lists
      23, // Merge K Sorted Lists
      24, // Swap Nodes In Pairs
      25, // Reverse Nodes In K Group
      61, // Rotate List
      83, // Remove Duplicates From Sorted List
      86, // Partition List
      92, // Reverse Linked List II
      138, // Copy List With Random Pointer
      141, // Linked List Cycle
      143, // Reorder List
      146, // LRU Cache
      147, // Insertion Sort List
      148, // Sort List
      160, // Intersection of Two Linked Lists
      203, // Remove Linked List Elements
      206, // Reverse Linked List
      234, // Palindrome Linked List
      287, // Find The Duplicate Number
      460, // LFU Cache
      622, // Design Circular Queue
      707, // Design Linked List
      725, // Split Linked List in Parts
      876, // Middle of the Linked List
      1472, // Design Browser History
      1721, // Swapping Nodes in a Linked List
      2130, // Maximum Twin Sum Of A Linked List
    ],
  },
  {
    id: "trees",
    name: "Trees",
    problemNumbers: [
      94, // Binary Tree Inorder Traversal
      95, // Unique Binary Search Trees II
      96, // Unique Binary Search Trees
      98, // Validate Binary Search Tree
      100, // Same Tree
      101, // Symmetric Tree
      102, // Binary Tree Level Order Traversal
      103, // Binary Tree Zigzag Level Order Traversal
      104, // Maximum Depth of Binary Tree
      105, // Construct Binary Tree From Preorder And Inorder Traversal
      106, // Construct Binary Tree from Inorder and Postorder Traversal
      108, // Convert Sorted Array to Binary Search Tree
      110, // Balanced Binary Tree
      112, // Path Sum
      124, // Binary Tree Maximum Path Sum
      129, // Sum Root to Leaf Numbers
      144, // Binary Tree Preorder Traversal
      145, // Binary Tree Postorder Traversal
      173, // Binary Search Tree Iterator
      199, // Binary Tree Right Side View
      226, // Invert Binary Tree
      230, // Kth Smallest Element In a Bst
      235, // Lowest Common Ancestor of a Binary Search Tree
      297, // Serialize And Deserialize Binary Tree
      337, // House Robber III
      427, // Construct Quad Tree
      450, // Delete Node in a BST
      513, // Find Bottom Left Tree Value
      538, // Convert Bst to Greater Tree
      543, // Diameter of Binary Tree
      572, // Subtree of Another Tree
      606, // Construct String From Binary Tree
      617, // Merge Two Binary Trees
      652, // Find Duplicate Subtrees
      662, // Maximum Width of Binary Tree
      669, // Trim a Binary Search Tree
      701, // Insert into a Binary Search Tree
      783, // Minimum Distance between BST Nodes
      894, // All Possible Full Binary Trees
      951, // Flip Equivalent Binary Trees
      958, // Check Completeness of a Binary Tree
      1376, // Time Needed to Inform All Employees
      1443, // Minimum Time to Collect All Apples in a Tree
      1448, // Count Good Nodes In Binary Tree
      1993, // Operations On Tree
    ],
  },
  {
    id: "tries",
    name: "Tries",
    problemNumbers: [
      208, // Implement Trie Prefix Tree
      211, // Design Add And Search Words Data Structure
      212, // Word Search II
      2707, // Extra Characters in a String
    ],
  },
  {
    id: "heap-priority-queue",
    name: "Heap / Priority Queue",
    problemNumbers: [
      215, // Kth Largest Element In An Array
      295, // Find Median From Data Stream
      355, // Design Twitter
      502, // IPO
      621, // Task Scheduler
      703, // Kth Largest Element In a Stream
      767, // Reorganize String
      973, // K Closest Points to Origin
      1046, // Last Stone Weight
      1094, // Car Pooling
      1383, // Maximum Performance of a Team
      1405, // Longest Happy String
      1675, // Minimize Deviation in Array
      1834, // Single Threaded Cpu
      1845, // Seat Reservation Manager
      1882, // Process Tasks Using Servers
      1985, // Find The Kth Largest Integer In The Array
      2542, // Maximum Subsequence Score
    ],
  },
  {
    id: "backtracking",
    name: "Backtracking",
    problemNumbers: [
      17, // Letter Combinations of a Phone Number
      39, // Combination Sum
      40, // Combination Sum II
      46, // Permutations
      47, // Permutations II
      51, // N Queens
      52, // N Queens II
      77, // Combinations
      78, // Subsets
      79, // Word Search
      90, // Subsets II
      93, // Restore IP Addresses
      131, // Palindrome Partitioning
      473, // Matchsticks to Square
      698, // Partition to K Equal Sum Subsets
      1239, // Maximum Length of a Concatenated String With Unique Characters
      1849, // Splitting a String Into Descending Consecutive Values
      1980, // Find Unique Binary String
    ],
  },
  {
    id: "graphs",
    name: "Graphs",
    problemNumbers: [
      127, // Word Ladder
      130, // Surrounded Regions
      133, // Clone Graph
      200, // Number of Islands
      207, // Course Schedule
      210, // Course Schedule II
      261, // Graph Valid Tree
      286, // Walls And Gates
      323, // Number of Connected Components In An Undirected Graph
      399, // Evaluate Division
      417, // Pacific Atlantic Water Flow
      463, // Island Perimeter
      684, // Redundant Connection
      695, // Max Area of Island
      721, // Accounts Merge
      752, // Open The Lock
      785, // Is Graph Bipartite?
      802, // Find Eventual Safe States
      909, // Snakes And Ladders
      934, // Shortest Bridge
      953, // Verifying An Alien Dictionary
      994, // Rotting Oranges
      1020, // Number of Enclaves
      1091, // Shortest Path in Binary Matrix
      1129, // Shortest Path with Alternating Colors
      1162, // As Far from Land as Possible
      1254, // Number of Closed Islands
      1462, // Course Schedule IV
      1466, // Reorder Routes to Make All Paths Lead to The City Zero
      1553, // Minimum Number of Days to Eat N Oranges
      1557, // Minimum Number of Vertices to Reach all Nodes
      1857, // Largest Color Value in a Directed Graph
      1905, // Count Sub Islands
      1958, // Check if Move Is Legal
      2101, // Detonate the Maximum Bombs
      2359, // Find Closest Node to Given Two Nodes
      2477, // Minimum Fuel Cost to Report to the Capital
      2492, // Minimum Score of a Path Between Two Cities
    ],
  },
  {
    id: "1-d-dynamic-programming",
    name: "1-D Dynamic Programming",
    problemNumbers: [
      5, // Longest Palindromic Substring
      70, // Climbing Stairs
      91, // Decode Ways
      120, // Triangle
      139, // Word Break
      152, // Maximum Product Subarray
      198, // House Robber
      213, // House Robber II
      256, // Paint House
      279, // Perfect Squares
      300, // Longest Increasing Subsequence
      322, // Coin Change
      343, // Integer Break
      377, // Combination Sum IV
      416, // Partition Equal Subset Sum
      472, // Concatenated Words
      647, // Palindromic Substrings
      673, // Number of Longest Increasing Subsequence
      691, // Stickers to Spell Word
      740, // Delete And Earn
      746, // Min Cost Climbing Stairs
      837, // New 21 Game
      983, // Minimum Cost For Tickets
      1035, // Uncrossed Lines
      1137, // N-th Tribonacci Number
      1359, // Count all Valid Pickup and Delivery Options
      1406, // Stone Game III
      1626, // Best Team with no Conflicts
      1799, // Maximize Score after N Operations
      1856, // Maximum Subarray Min Product
      1964, // Find the Longest Valid Obstacle Course at Each Position
      2140, // Solving Questions With Brainpower
      2369, // Check if There is a Valid Partition For The Array
      2466, // Count Ways to Build Good Strings
    ],
  },
  {
    id: "intervals",
    name: "Intervals",
    problemNumbers: [
      56, // Merge Intervals
      57, // Insert Interval
      252, // Meeting Rooms
      253, // Meeting Rooms II
      352, // Data Stream as Disjoint Intervals
      435, // Non Overlapping Intervals
      1288, // Remove Covered Intervals
      1851, // Minimum Interval to Include Each Query
    ],
  },
  {
    id: "greedy",
    name: "Greedy",
    problemNumbers: [
      45, // Jump Game II
      53, // Maximum Subarray
      55, // Jump Game
      134, // Gas Station
      135, // Candy
      646, // Maximum Length of Pair Chain
      649, // Dota2 Senate
      678, // Valid Parenthesis String
      763, // Partition Labels
      846, // Hand of Straights
      918, // Maximum Sum Circular Subarray
      978, // Longest Turbulent Array
      1029, // Two City Scheduling
      1423, // Maximum Points You Can Obtain From Cards
      1647, // Minimum Deletions to Make Character Frequencies Unique
      1871, // Jump Game VII
      1899, // Merge Triplets to Form Target Triplet
      1921, // Eliminate Maximum Number of Monsters
      2439, // Minimize Maximum of Array
    ],
  },
  {
    id: "advanced-graphs",
    name: "Advanced Graphs",
    problemNumbers: [
      269, // Alien Dictionary
      332, // Reconstruct Itinerary
      743, // Network Delay Time
      778, // Swim In Rising Water
      787, // Cheapest Flights Within K Stops
      1489, // Find Critical and Pseudo Critical Edges in Minimum Spanning Tree
      1514, // Path with Maximum Probability
      1579, // Remove Max Number of Edges to Keep Graph Fully Traversable
      1584, // Min Cost to Connect All Points
      1631, // Path with Minimum Effort
      2421, // Number of Good Paths
    ],
  },
  {
    id: "2-d-dynamic-programming",
    name: "2-D Dynamic Programming",
    problemNumbers: [
      10, // Regular Expression Matching
      62, // Unique Paths
      63, // Unique Paths II
      64, // Minimum Path Sum
      72, // Edit Distance
      97, // Interleaving String
      115, // Distinct Subsequences
      221, // Maximal Square
      309, // Best Time to Buy And Sell Stock With Cooldown
      312, // Burst Balloons
      329, // Longest Increasing Path In a Matrix
      474, // Ones and Zeroes
      494, // Target Sum
      516, // Longest Palindromic Subsequence
      518, // Coin Change II
      877, // Stone Game
      879, // Profitable Schemes
      920, // Number of Music Playlists
      926, // Flip String to Monotone Increasing
      1049, // Last Stone Weight II
      1140, // Stone Game II
      1143, // Longest Common Subsequence
      1220, // Count Vowels Permutation
      1547, // Minimum Cost to Cut a Stick
      1639, // Number of Ways to Form a Target String Given a Dictionary
      1866, // Number of Ways to Rearrange Sticks With K Sticks Visible
      2218, // Maximum Value of K Coins from Piles
      5782, // Maximum Alternating Subsequence Sum
    ],
  },
  {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    problemNumbers: [
      7, // Reverse Integer
      67, // Add Binary
      136, // Single Number
      190, // Reverse Bits
      191, // Number of 1 Bits
      268, // Missing Number
      338, // Counting Bits
      371, // Sum of Two Integers
      989, // Add to Array-Form of Integer
      1470, // Shuffle the Array
    ],
  },
  {
    id: "math-and-geometry",
    name: "Math & Geometry",
    problemNumbers: [
      6, // Zigzag Conversion
      9, // Palindrome Number
      12, // Integer to Roman
      13, // Roman to Integer
      43, // Multiply Strings
      48, // Rotate Image
      50, // Pow(x, n)
      54, // Spiral Matrix
      59, // Spiral Matrix II
      66, // Plus One
      73, // Set Matrix Zeroes
      149, // Maximum Points on a Line
      168, // Excel Sheet Column Title
      202, // Happy Number
      263, // Ugly Number
      1041, // Robot Bounded In Circle
      1071, // Greatest Common Divisor of Strings
      1260, // Shift 2D Grid
      1523, // Count Odd Numbers in an Interval Range
      1572, // Matrix Diagonal Sum
      2013, // Detect Squares
      2028, // Find Missing Observations
    ],
  },
];

function buildTopicIdByProblemNumber(): Map<number, string> {
  const topicIdByNumber = new Map<number, string>();
  for (let topicIndex = 0; topicIndex < NEETCODE_TOPICS.length; topicIndex++) {
    const topic = NEETCODE_TOPICS[topicIndex];
    for (let numberIndex = 0; numberIndex < topic.problemNumbers.length; numberIndex++) {
      topicIdByNumber.set(topic.problemNumbers[numberIndex], topic.id);
    }
  }
  return topicIdByNumber;
}

const TOPIC_ID_BY_PROBLEM_NUMBER = buildTopicIdByProblemNumber();

// The topic a LeetCode problem belongs to, or "other" if NeetCode doesn't have it.
export function getTopicId(problemNumber: number): string {
  const topicId = TOPIC_ID_BY_PROBLEM_NUMBER.get(problemNumber);
  if (topicId) {
    return topicId;
  }
  return OTHER_TOPIC_ID;
}

// Every topic a user can filter by: the roadmap topics in order, then "Other" last.
export function listTopicChoices(): TopicChoice[] {
  const topicChoices: TopicChoice[] = [];
  for (let topicIndex = 0; topicIndex < NEETCODE_TOPICS.length; topicIndex++) {
    topicChoices.push({ id: NEETCODE_TOPICS[topicIndex].id, name: NEETCODE_TOPICS[topicIndex].name });
  }
  topicChoices.push({ id: OTHER_TOPIC_ID, name: OTHER_TOPIC_NAME });
  return topicChoices;
}

// The topic with this id, or null if there is none (for example a mistyped link).
export function findTopicChoice(topicId: string): TopicChoice | null {
  const topicChoices = listTopicChoices();
  for (let topicIndex = 0; topicIndex < topicChoices.length; topicIndex++) {
    if (topicChoices[topicIndex].id === topicId) {
      return topicChoices[topicIndex];
    }
  }
  return null;
}
