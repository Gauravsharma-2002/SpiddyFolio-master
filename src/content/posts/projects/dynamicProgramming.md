---
title: "Rolling over the uneven path of Dynamic Programming"
published: 2024-03-02
updated: 2024-04-03
description: "Checking out the patterns of questions involved in Dynamic programming"
tags: ["DataStructures", "Notes"]
category: "DataStructures"
draft: false
---

# Patterns to master Dynamic Programming

<b>Dynamic Programming {DP}</b> is arguably the most difficult topic for coding interviews.

<!-- <s>_（种子早在两年前就种下了，现在才开始生长，请叫我摆烂 Master）_</s>。 -->

But, like any other topic, the fastest way to learn it is by understanding different patterns that can help you solve a wide variety of problems.

<center>
  <img src="dp.svg" />
</center>

In this article, I'll walk through <b>20 patterns </b> that will make learning DP much easier.

Here i gonna share when to use each pattern and provide links to Leetcode Problems to practice and learn effectively.

I had Listed them from begginer friendly aka easy to master friendly aka hard and also linked resources to learn each pattern.

<!-- 话说今年（确切的说应该是截至九月中旬）我主要功夫都会倾注在学业中，这意味着，我能投身于技术探索的时间将变得稀缺（这怎么行，我怎么能原地踏步！所以，即便当前以学业为主，我也打算在这段时间顺便积淀一下自己的硬实力。待到回归之日，又是一个更哇塞的自己～）……

借口？或许吧……刚开学前两周经受了一个「小小的」挫折，让我有「一点点」崩。唉，说多了都是泪……没死就好 LOL

主要参考书籍是**_《操作系统真象还原》_**，这本书体量和 **_CSAPP_** 有一拼……

记录一下，我是从 _03/09/2025_ 正式开始的，<s>虽然还没写下任何一行代码，但准确来说就是这个点……</s>只是想在最后看看什么时候结束，届时可能会小小的感慨一下下吧。

::github{repo="CuB3y0nd/Exordium"} -->

<br />

# 1. Fibonacci Sequence

<!-- ## 实模式下的 1MB 内存布局 -->

Fibonacci Sequence pattern is useful when the solution to a problem depends on the solution of smaller instances of the same problem.

There is a clear recursive relationship, mostly similiar to the standard Fibonacci Squence F(n) = F(n-1) + F(n-2);

## LeetCode Problems:

1. LeetCode 509: Fibonacci Number
   (https://leetcode.com/problems/fibonacci-number/description/)
2. LeetCode 70: climbing Stairs
   (https://leetcode.com/problems/climbing-stairs/description/)
3. LeetCode 70: Min cost Climbing Stairs
   (https://leetcode.com/problems/min-cost-climbing-stairs/description/)
   </br>

# 2. Kadane's Algorithm

<!-- ## 实模式下的 1MB 内存布局 -->

Kadane's Algorithm is primarily used for solving the Maximum Subarray Problem and its variations where the problem asks to optimize a contiguous subarray within a one-dimensional numeric array

## LeetCode Problems:

1. LeetCode 509: Maximum sum circular subarray
   (https://leetcode.com/problems/maximum-sum-circular-subarray/description/)
2. LeetCode 70: Maximum subarray
   (https://leetcode.com/problems/maximum-subarray/description/)
3. LeetCode 70: Maximum product subarray
   (https://leetcode.com/problems/maximum-product-subarray/description/)
   </br>

# 3. 0/1 Knapsack

> [!TIP]
>
> 1. you have a set of items array and this item may have one or more property
> 2. you need to select a subset of these items
> 3. there is a constant constraint called weight or cost
> 4. you have to maximise or minimise the total value of selected subset items
> 5. each item can either can be taken or chosen or not taken or not chosen(0/1)

<!-- ## 实模式下的 1MB 内存布局 -->

## LeetCode Problems:

1. coding ninhjas: SubsetSum equal to k
   (https://www.naukri.com/code360/problems/subset-sum-equal-to-k_1550954)
2. LeetCode 70: partition Equal Subset Sum
   (https://leetcode.com/problems/partition-equal-subset-sum/description/)
3. LeetCode 70: Target Sum
   (https://leetcode.com/problems/target-sum/description/)
4. LeetCode 1049 : Last stone Weight II
   (https://leetcode.com/problems/last-stone-weight-ii/description/)

   </br>

# 4. Unbounded Knapsack

<!-- ## 实模式下的 1MB 内存布局 -->

> [!TIP]
> use unbounded knapsack patten when
>
> 1. you have a set of items with or without its property like weight[] and value[]
> 2. you need to select the items to maximize total value.
> 3. there is a constraint called as cost or weight or something
> 4. you can select single item multiple number of times( recall that in 0/1 you can only select it or not select it )
> 5. and it is given that supply of each item is infinite

## LeetCode Problems:

1. LeetCode 518: Coin Change 2
   (https://leetcode.com/problems/coin-change-ii/description/)
2. LeetCode 322: Coin Change
   (https://leetcode.com/problems/coin-change/description/)
3. LeetCode 279: Perfect Squares
   (https://leetcode.com/problems/maximum-product-subarray/description/)
   </br>

# 5. Longest Common Subsequence(LCS)\*

<!-- ## 实模式下的 1MB 内存布局 -->

> [!Tip]
> use this pattern when you have given two sequence or given only one sequence and other might get dervied from this given sequence
> most important this pattern mostly includes the operation of 2 sequences
>
> 1. use this when you need to determine a sequence from the given strings
> 2. order of elements of strings/array would not change in the problems of this pattern and answer would contain the solution related to the sequence

## Problems:

1. LeetCode 1143: Longest Common Subsequence
   (https://leetcode.com/problems/longest-common-subsequence/description/)
2. LeetCode 583: Delete Operation for two strings
   (https://leetcode.com/problems/delete-operation-for-two-strings/description/)
3. LeetCode 1092: Shortest Common superSequence
   (https://leetcode.com/problems/shortest-common-supersequence/description/)
   </br>

# 6. Longest Increasing Subsequence

use longest increasing subsequence in the problems that requires the finding of the longest sequence of elements in sequence where the elements are in increasing order.

## LeetCode Problems:

1. LeetCode 300: Longest Increasing Subsequence
   (https://leetcode.com/problems/longest-increasing-subsequence/description/)
2. LeetCode 673: Number of Longest Increasing Subsequence
   (https://leetcode.com/problems/number-of-longest-increasing-subsequence/description/)
3. leetCode 354: Russian Doll Envelopes
   (https://leetcode.com/problems/russian-doll-envelopes/description/)
   </br>

# 7. palindromic Subsequence

> [!Tip]
> a variant of longest common subsequence
>
> 1. in this type of problem only one string is given and another string is the same string in reversed order and the longest common subsequence is the plaindromic subsequence
> 2. Remember the property of the palindrome

## LeetCode Problems:

1. LeetCode 516: Longest Palindromic Subsequence
   (https://leetcode.com/problems/longest-palindromic-subsequence/description/)
2. LeetCode 647: Palindromic Substrings
   (https://leetcode.com/problems/palindromic-substrings/description/)
3. LeetCode 1312: Minimum Insertion Steps to Make a String Palindrome
   (https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/description/)
   </br>

# 8. Edit Distance

this is variation of the problem done above this constitute some of the operation to be done on the given string which include deletion, insertion swapping or replacement

> [!Tip]
>
> 1. use this pattern when you feel like you have to transform the given string to obtain the answer
> 2. mostly it is asked to tranform the given string into another string and count the number of operations required to do so

## LeetCode Problems:

1. LeetCode 72: Edit Distance
   (https://leetcode.com/problems/edit-distance/description/)
2. LeetCode 583: Delete Operation for Two Strings
   (https://leetcode.com/problems/delete-operation-for-two-strings/description/)
3. LeetCode 712: Minimum ASCII Delete Sum for Two Strings
   (https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/description/)
   </br>

# 9. subset sum

<!-- ## 实模式下的 1MB 内存布局 -->

in this pattern it is asked to check or find if the given array could constitute the required sum or not and also to find that subsequence or subset

> [!Tip]
>
> 1. this is variation of 0/1 knapsack problem with only item having one property of weight[] given
> 2. second given is the constraint or the cost or the required sum which the subsets have to achieve

## LeetCode Problems:

1. LeetCode 416: Partition Equal Subset Sum
   (https://leetcode.com/problems/partition-equal-subset-sum/description/)
2. LeetCode 494: Target Sum
   (https://leetcode.com/problems/target-sum/description/)
3. LeetCode 698: Partition to K Equal Sum Subsets
   (https://leetcode.com/problems/partition-to-k-equal-sum-subsets/description/)
   </br>

# 10. String partition

The String Partition pattern is used to solve problems that involve partitioning a string into smaller substrings that satisfy certain conditions.

It’s useful when:

1. You're working with problems involving strings or sequences.

2. The problem requires splitting the string into substrings or subsequences.

3. You need to optimize some property over these partitions (e.g., minimize cost, maximize value).

4. The solution to the overall problem can be built from solutions to subproblems on smaller substrings.

There's a need to consider different ways of partitioning the string.

## LeetCode Problems:

1. LeetCode 139: Word Break
   (https://leetcode.com/problems/word-break/description/)
2. LeetCode 132. Palindrome Partitioning II
   (https://leetcode.com/problems/palindrome-partitioning-ii/description/)
3. LeetCode 472: Concatenated Words
   (https://leetcode.com/problems/concatenated-words/description/)

   </br>

# 11. Catalan Numbers

<!-- ## 实模式下的 1MB 内存布局 -->

The Catalan Number pattern is used to solve combinatorial problems that can be decomposed into smaller, similar subproblems.

> some of the use-case of this problem of this pattern includes:
>
> 1. counting the number of <b>vlaid parentheses</b> expression of a given length
> 2. counting number of distinct binary search tree that can be formed with n nodes.
> 3. Counting the number of ways to triangulate a polygon with n+2 sides.

## LeetCode Problems:

1. LeetCode 22: Generate Parentheses
   (https://leetcode.com/problems/generate-parentheses/description/)
2. LeetCode 96: Unique Binary Search Trees
   (https://leetcode.com/problems/unique-binary-search-trees/description/)
   </br>

# 12. Matrix chain multiplication

<!-- ## 实模式下的 1MB 内存布局 -->

Belive me this one is the most confusing one pattern and requires alot to get absorbed
use this pattern in the problems that involves determining optimal order of operation to minimize the cost of performing a series of operations.

it is based on standard optimisation problem: Matrix Chain Multiplication

> use this when
>
> 1.  if dealing with a sequence of elements that can be combined pairwise.
> 2.  the cost of combining elements depends on the order of combination.
> 3.  it is needed to find the optimal way to combine the elements.
> 4.  the problem invlolves minimizing/maximizing the cost of operations of combining the elements.

## Problems:

1. Matrix Chain Multiplication
   (https://www.naukri.com/code360/problems/matrix-chain-multiplication_975344)
2. LeetCode 1000: Minimum Cost to Merge Stones
   (https://leetcode.com/problems/minimum-cost-to-merge-stones/description/)
3. LeetCode 1039. Minimum Score Triangulation of Polygon
   (https://leetcode.com/problems/minimum-score-triangulation-of-polygon/description/)
4. LeetCode 312. Burst Balloons
   (https://leetcode.com/problems/burst-balloons/description/)
   </br>

# 13. Count Distinct Ways

use this pattern when:

> 1.  You need to count the number of different ways to achieve a certain goal or reach a particular state
> 2.  The problem involves making a series of choices or steps to reach a target.
> 3.  There are multiple valid paths or combinations to reach the solution.
> 4.  The problem can be broken down into smaller subproblems with overlapping solutions.
> 5.  You're dealing with combinatorial problems that ask "in how many ways" can something be done.

## Problems:

1. LeetCode 91. Decode Ways
   (https://leetcode.com/problems/decode-ways/description/)
2. LeetCode 2266. Count Number of Texts
   (https://leetcode.com/problems/count-number-of-texts/description/)

   </br>

# 14. DP on Grids

The DP on Grids pattern is used to solve problems that involve navigating or optimizing paths within a grid (2D array).

For these problems, you need to consider multiple directions of movement (e.g., right, down, diagonal) and solution at each cell depends on the solutions of neighboring cells.

## Problems:

1. LeetCode 64. Minimum Path Sum
   (https://leetcode.com/problems/minimum-path-sum/description/)
2. LeetCode 62. Unique Paths
   (https://leetcode.com/problems/unique-paths/description/)
3. LeetCode 329. Longest Increasing Path in a Matrix
   (https://leetcode.com/problems/longest-increasing-path-in-a-matrix/description/)

   </br>

# 15. DP on Trees

The DP on Trees pattern is useful when:

> 1.  You're working with tree-structured data represented by nodes and edges.
> 2.  The problem can be broken down into solutions of subproblems that are themselves tree problems.
> 3.  The problem requires making decisions at each node that affect its children or parent.

You need to compute values for nodes based on their children or ancestors.

## Problems:

1. LeetCode 337. House Robber III
   (https://leetcode.com/problems/house-robber-iii/description/)
2. LeetCode 124: Binary Tree Maximum Path Sum
   (https://leetcode.com/problems/binary-tree-maximum-path-sum/description/)
3. LeetCode 968. Binary Tree Cameras
   (https://leetcode.com/problems/binary-tree-cameras/description/)

   </br>

# 16. Dp on Graphs

The DP on Graphs pattern is useful when:

> 1.  You're dealing with problems involving graph structures.
> 2.  The problem requires finding optimal paths, longest paths, cycles, or other optimized properties on graphs.
> 3.  You need to compute values for nodes or edges based on their neighbors or connected components.

The problem involves traversing a graph while maintaining some state.

## Problems:

1. LeetCode 787: Cheapest Flights Within K Stops
   (https://leetcode.com/problems/cheapest-flights-within-k-stops/description/)
2. LeetCode 1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance
   (https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/description/)

   </br>

# 17. Digit Dp

The Digit DP Pattern is useful when:

> 1.  You're dealing with problems involving counting or summing over a range of numbers.
> 2.  The problem requires considering the digits of numbers individually.
> 3.  You need to find patterns or properties related to the digits of numbers within a range.
> 4.  The range of numbers is large (often up to 10^18 or more), making brute force approaches infeasible.
> 5.  The problem involves constraints on the digits.

## Problems:

1. LeetCode 357: Count Numbers with Unique Digits
   (https://leetcode.com/problems/count-numbers-with-unique-digits/description/)
2. LeetCode 233: Number of Digit One
   (https://leetcode.com/problems/number-of-digit-one/description/)
3. LeetCode 902. Numbers At Most N Given Digit Set
   (https://leetcode.com/problems/numbers-at-most-n-given-digit-set/description/)

   </br>

# 18. Bitmasking Dp

The Bitmasking DP pattern is used to solve problems that involve a large number of states or combinations, where each state can be efficiently represented using bits in an integer.

> It’s particularly useful when:

> 1.  You're dealing with problems involving subsets or combinations of elements.
> 2.  The total number of elements is relatively small (typically <= 20-30).
> 3.  You need to efficiently represent and manipulate sets of elements.
> 4.  The problem involves making decisions for each element (include/exclude) or tracking visited/unvisited states.
> 5.  You want to optimize space usage in DP solutions.

## Problems:

1. LeetCode 2305. Fair Distribution of Cookies
   (https://leetcode.com/problems/fair-distribution-of-cookies/description/)
2. LeetCode 847. Shortest Path Visiting All Nodes
   (https://leetcode.com/problems/shortest-path-visiting-all-nodes/description/)

   </br>

# 19. Probability DP

This pattern is useful when:

> 1.  You're dealing with problems involving probability calculations.
> 2.  The probability of a state depends on the probabilities of previous states.
> 3.  You need to calculate the expected value of an outcome.
> 4.  The problem involves random processes or games of chance.

## Problems:

1. LeetCode 688. Knight Probability in Chessboard
   (https://leetcode.com/problems/knight-probability-in-chessboard/description/)
2. LeetCode 837. New 21 Game
   (https://leetcode.com/problems/new-21-game/description/)
3. LeetCode 808. Soup Servings
   (https://leetcode.com/problems/soup-servings/description/)

   </br>

# 20. State Machine DP

The State Machine DP Pattern is useful when when:

> 1.  The problem can be modeled as a series of states and transitions between these states.
> 2.  There are clear rules for moving from one state to another.
> 3.  The optimal solution depends on making the best sequence of state transitions.
> 4.  The problem involves making decisions that affect future states.
> 5.  There's a finite number of possible states, and each state can be clearly defined.

## Problems:

1. LeetCode 309. Best Time to Buy and Sell Stock with Cooldown
   (https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/)
2. LeetCode Best Time to Buy and Sell Stock III
   (https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/)
   </br>

<!-- 为何是 1MB？这得追溯到 Intel 8086 的时代了。那时候 Intel 8086 只有 20 根地址总线，故其只能访问 $$2^{20} =1048576$$ 字节，也就是 1MB 的内存空间，而这 1MB 又被拆为多个部分分别用于不同的用途。

实模式下的内存布局如下：

| 起始    | 结束    | 大小              | 用途                                                                                                                                             |
| ------- | ------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0xFFFF0 | 0xFFFFF | 16B               | BIOS 入口地址，此地址也属于 BIOS 代码，同样属于顶部的 64KB 字节。只是为了强调其入口地址才单独贴出来。此处 16 字节的内容是跳转指令 jmp F000\:E05B |
| 0xF0000 | 0xFFFEF | 64KB-16B          | 系统 BIOS 范围是 F0000\~FFFFF 共 64B，为了说明入口地址，将最上面的 16 字节从此处去掉了，所以此处终止地址是 0xFFFEF                               |
| 0xC8000 | 0xEFFFF | 160KB             | 映射硬件适配器的 ROM 或内存映射式 I/O                                                                                                            |
| 0xC0000 | 0xC7FFF | 32KB              | 显示适配器 BIOS                                                                                                                                  |
| 0xB8000 | 0xBFFFF | 32KB              | 用于文本模式显示适配器                                                                                                                           |
| 0xB0000 | 0xB7FFF | 32KB              | 用于黑白显示适配器                                                                                                                               |
| 0xA0000 | 0xAFFFF | 64KB              | 用于彩色显示适配器                                                                                                                               |
| 0x9FC00 | 0x9FFFF | 1KB               | EDBA (Extended BIOS Data Area)                                                                                                                   |
| 0x7E00  | 0x9FBFF | 622080B，约 608KB | 可用区域                                                                                                                                         |
| 0x7C00  | 0x7DFF  | 512B              | MBR 被 BIOS 加载到此处                                                                                                                           |
| 0x500   | 0x7BFF  | 30464B，约 30KB   | 可用区域                                                                                                                                         |
| 0x400   | 0x4FF   | 256B              | BIOS Data Area                                                                                                                                   |
| 0x00    | 0x3FF   | 1KB               | Interrupt Vector Table                                                                                                                           |

## 计算机的启动过程

当按下主机上的 Power 键后，CPU 的 `CS:IP` 被强制初始化为 `0xF000:0xFFF0`. 由于刚开机时处于实模式，故段部件将段地址左移四位再加上偏移地址，得到物理地址 0xFFFF0，也就是是 `BIOS (Basic Input/Output System)` 的入口地址。所以第一个被运行的软件是 BIOS. BIOS 主要负责通过硬件提供的基本调用来检测、初始化硬件，除此之外，它还建立了最基本的 `中断向量表 (Interrupt Vector Table, IVT)`，之所以说是最基本，是因为 BIOS 就 64KB 大，不可能把所有的硬件 I/O 操作都实现得面面俱到，并且也没必要实现那么多，因为这是在实模式，对硬件支持的再丰富也白搭，精彩的世界是从进入保护模式后才开始的，所以它只挑了一些最重要的、保证计算机能运行的那些最基本的硬件 I/O 操作实现。

> [!TIP]
> 因为 BIOS 是计算机上第一个运行的软件，所以它不可能自己加载自己，而是由只读存储器 ROM 这个硬件加载的。
>
> BIOS 存在于主板上的 ROM 中，硬件将这个 ROM 的地址映射到低端 1MB 内存的顶部，也就是 0xF0000~0xFFFFF 处。

因为实模式下只能访问到 1MB 的空间，而 0xFFFF0 距 1MB 只剩可怜的 16 字节了，在这么小的空间里我们着实做不了太多操作，故在此放的是一条跳转指令，通过 `jmp F000:E05B` 跳转到 0xFE05B 处继续执行，也就是说真正的 BIOS 代码是从 0xFE05B 开始的。

接下来 BIOS 便马不停蹄地检测内存、显卡等外设信息，当所有检测通过，并初始化好硬件后，便在 0x00~0x03FF 处建立中断向量表，并向其中填写中断例程。

计算机执行到这份上，BIOS 也即将完成它这短暂的一生的使命了，完成之后，它又将沉沉睡去。想到这里，心里不免一丝忧伤，甚至有些许挽留它的想法。可是，这就是它的使命，它生来被设计成这样，它这短暂的一生已经为后人创造了足够的精彩。何况，在下一次开机时，BIOS 还会重复这段轮回，它并没有消失……多么伟大啊！好了，让伤感停止，让梦想前行！

BIOS 的最后一项工作是去校验启动盘中位于 `0 盘 0 道 1 扇区` 的内容。如果此扇区末尾的两个字节分别为 `0x55` 和 `0xAA`，BIOS 便认为此扇区中存在可执行程序，也就是 `主引导记录 MBR (Main Boot Record)`，随即将其加载到 `0x7c00` 处，并跳转到该地址继续执行。

为什么一定是 0 盘 0 道 1 扇区，而不是其它地方？对于这个问题，简单来说就是为了方便 BIOS 找到 MBR。想象一下，如果不存在这一规定，BIOS 就只得将所有检测到的存储设备上的的每一个存储单位都翻一遍，挨个对比，如果发现该存储单位的最后两字节为 0x55 和 0xAA，就认为它是 MBR. 几经花开花落，找到 MBR 的那一刻，BIOS 满脸疲惫地说：「你是我找了好久的那个人。」MBR 抬起经不起岁月等待的脸：「难得你还认得我，我等你等的花儿都谢了。」其实 BIOS 的心声是：「看我手忙脚乱的样子，你们这是要闹哪样啊。就这么 512 字节的内容，害我找遍全世界，我们这是在跑接力赛啊，下一棒的选手我都不知道在哪里……以后让它站在固定的位置等我！」

由于 0 盘 0 道 1 扇区是磁盘的第一个扇区，MBR 选择了这个离 BIOS 最近的位置站好了，从此以后再也不用担心被 BIOS 骂了。

总之，计算机中到处都有写死的东西，各种各样的魔数层出不穷，0xAA55 也是其中之一，这个就不解释了，当成规定/协议理解吧……

至于 0x7c00 是怎么来的，倒是可以解释一下。0x7c00 最早出现于 1981 年 8 月，IBM 公司推出的个人计算机 PC 5150 的 ROM BIOS 的 INT 19H 中断处理程序中。PC 5150 是世界上第一台个人计算机，它就是现代 x86 个人计算机兼容机的祖先。

个人计算机肯定要运行操作系统，在这台计算机上，运行的操作系统是 DOS 1.0。不清楚此系统要求的最小内存是 16KB 还是 32KB，反正 PC 5150 BIOS 研发团队就假定其是 32KB 的，所以此 BIOS 是按照最小内存 32KB 研发的。

MBR 不是随便放在哪里都行的，首先它不能覆盖已有数据，其次，它还不能过早的被其它数据覆盖。MBR 的任务是加载某个程序（一般是内核加载器，很少有直接加载内核的）到指定位置，并将控制权交给它。之后，MBR 就没用了，被覆盖也没关系（我指的覆盖是覆盖 0x7c00 处的指令，因为 MBR 本身也是被加载到那个位置执行的，而非硬盘上所保存的 MBR，覆盖了硬盘上保存的 MBR 下次就不能启动了），但在此之前，得确保它的完整性。

重现一下当时的内存使用情况：

8086 CPU 要求 0x00~0x03FF 存放中断向量表，所以此处就不能动了，再选新的地方看看。按 DOS 1.0 要求的最小内存 32KB 来说，MBR 希望给人家尽可能多的预留空间，这样也是保全自己的作法，免得被过早覆盖。所以 MBR 只能放在 32KB 的末尾。

MBR 本身也是程序，是程序就要用到栈，栈也是在内存中的，虽然 MBR 本身只有 512 字节，但还要为其所用的栈分配点空间，所以其实际所用的内存空间要大于 512 字节，估计 1KB 内存够用了。

结合以上几点，选择 32KB 中的最后 1KB 最为合适。32KB 转换为十六进制是 0x8000，减去 1KB (0x400) 的话，正好等于 0x7c00。这就是备受质疑的 0x7c00 的由来！

### 实现一个简单的 MBR

最后，让我们写一个简单的程序来验证一下我们所学到的理论知识的正确性。

项目结构为：

```plaintext
.
├── boot
│   └── mbr.s
└── Makefile
```

```asm title="boot/mbr.asm" wrap=false
section mbr vstart=0x7c00
  mov ax, 0x0600 ; clear screen
  mov bh, 0x07   ; color attribute 0x07
  xor cx, cx     ; upper left corner
  mov dx, 0x184f ; bottom right corner
  int 0x10

  mov ah, 0x03   ; get cursor position
  xor bh, bh     ; video page 0
  int 0x10

  mov cx, 0x03   ; length of string
  mov ax, 0x1301 ; write string, move cursor
  mov bx, 0x07   ; video page 0, color attribute 0x07
  lea bp, [msg]  ; ES:BP is the pointer to string
  int 0x10

  jmp $

  msg db "MBR"

  times 510-($-$$) db 0
boot_flag:
  dw 0xAA55
```

以上，有关 `int 0x10` 视频中断的用法可以参考 [INT 10 - Video BIOS Services](https://stanislavs.org/helppc/int_10.html).

这里我不得不吐槽一句：AT&T 语法珍尼 🐴 屎……

更有趣的是：

> Intel Syntax Support
>
> Up until v2.10 of binutils, GAS supported only the AT&T syntax for x86 and x86-64, which differs significantly from the Intel syntax used by virtually every other assembler. Today, GAS supports both syntax sets (.intel_syntax and the default .att_syntax), and even allows disabling the otherwise mandatory operand prefixes '%' or '$' (...\_syntax noprefix). There are some pitfalls - several FP opcodes suffer from a reverse operand ordering that is bound to stay in there for compatibility reasons, .intel_syntax generates less optimized opcodes on occasion (try mov'ing to %si...).
>
> `It is generally discouraged to use the support for Intel Syntax because it can subtly and surprisingly different than the real Intel Syntax found in other assemblers.` A different assembler should be considered if Intel Syntax is desired.

你可知我有多无语……我反复用 GAS 重构 nasm，用 nasm 重构 GAS……最终，也还是没有活下来，我还是被这狗屎语法打倒了。学到了：珍惜生命，远离 GAS……不过倔强的精神告诉我，我以后大概还是会用 GAS 来重构，至于原因……Linux 内核用的就是这个……什么是自虐？我这就是……

```plaintext title="Makefile" wrap=false
AS = nasm
DD = dd bs=512 conv=notrunc
IMG = exordium.img
IMG_SIZE = 60M

all: boot/mbr create_img write_mbr

boot/mbr: boot/mbr.asm
 $(AS) -I boot -o $@ $<

create_img:
 qemu-img create -f raw $(IMG) $(IMG_SIZE)

write_mbr: boot/mbr
 $(DD) if=$< of=$(IMG) count=1

clean:
 rm -rf boot/mbr
 rm -f $(IMG)
```

使用 `make clean && make` 编译上述程序，并生成系统镜像。

之后，使用这个 `start.sh` 来模拟：

```shell title="start.sh" wrap=false
#!/bin/bash

IMG="exordium.img"

qemu-system-i386 -drive file=$IMG,format=raw,if=ide,index=0 -s -S -monitor stdio
```

使用下面这个 `debug.sh` 开启 gdb 以调试：

```shell title="debug.sh" wrap=false
#!/bin/sh

gdb -ix gdb/.gdbinit \
  -ex 'set tdesc filename gdb/target.xml' \
  -ex 'target remote localhost:1234'
```

我们 gdb 中直接 `(c) continue`，看到 MBR 三个大字被输出在屏幕上，就意味着我们成功地向 MBR 迈出了第一步，壮举！

> [!TIP]
> 如果你通过 gdb 查看开机后运行的第一条指令，会发现这条指令并不符合我们的预期，这是因为 gdb 是按照 32-bit 指令格式进行解析指令的，而不是 16-bit 指令格式。
>
> 所以如果你想查看开机后运行的第一条指令的话，可以在启动虚拟机的指令后面加上 `-monitor stdio` 参数，之后在 qemu 控制台使用 `x/10i $cs*16+$eip` 指令来进行查看。
>
> 结果如下：
>
> ```asm showLineNumbers=false wrap=false ins={2}
> (qemu) x/10i $cs*16+$eip
> 0x000ffff0:  ea 5b e0 00 f0           ljmpw    $0xf000:$0xe05b
> 0x000ffff5:  30 36 2f 32              xorb     %dh, 0x322f
> 0x000ffff9:  33 2f                    xorw     (%bx), %bp
> 0x000ffffb:  39 39                    cmpw     %di, (%bx, %di)
> 0x000ffffd:  00 fc                    addb     %bh, %ah
> 0x000fffff:  00 00                    addb     %al, (%bx, %si)
> 0x00100001:  00 00                    addb     %al, (%bx, %si)
> 0x00100003:  00 00                    addb     %al, (%bx, %si)
> 0x00100005:  00 00                    addb     %al, (%bx, %si)
> 0x00100007:  00 00                    addb     %al, (%bx, %si)
> ```
>
> 其实还有别的方法，比如直接用 bochs，它很好的支持 16-bit 指令等内容，你也可以手动 patch qemu，或者简单点，如果你还是想用 qemu + gdb 的话，在我的项目根目录下有一个 `gdb` 目录，包含了 16-bit 调试的拓展脚本，并且可以自动在进入保护模式后切换到 32-bit 架构，实现正确解析不同架构之间的指令。
>
> 参考：[The only proper way to debug 16-bit code on Qemu+GDB](https://gist.github.com/Theldus/4e1efc07ec13fb84fa10c2f3d054dccd).

### Loader，我们的救星

由于 MBR 受限于 512 字节大小的空间，显然，这么点小小的空间肯定不足以我们将内核加载进内存并运行。所以一个很自然的想法就是，实现一个 Loader，用它来初始化环境并加载内核。

Loader 应该被 MBR 从硬盘读取到内存后执行，那我们应该将 Loader 写在硬盘中什么位置呢？我们知道 MBR 已经占据了第 0 扇区（LBA 扇区从 0 开始编号），那我们把它放到第 1 扇区？当然可以，但是离得那么近，心理多少有点不踏实，还是隔开点好了……那就放到第 2 扇区好啦～那么现在的问题是，我们把它加载到哪里好呢？理论上任何一块空闲空间都可以，参考实模式下的 1MB 内存布局可知，0x0500\~0x7BFF 和 0x7E00\~0x9FBFF 都是空闲内存。由于未来 Loader 中需要定义一些数据结构，比如 GDT，这些数据结构将来的内核还需要使用，所以 Loader 加载到内存后不能被覆盖；其次，随着我们不断添加功能，内核必然越来越大，其所在的内存地址也会向越来越高的的地方发展，难免会超过可用区域的上限，所以应该尽量把 Loader 放在低处，多留一些空间给内核。但……我选择效仿 Linux 内核的设计，把它加载到了 0x90000 这个位置，大家随意～

有关硬盘的操作，可以参考 [AT Attachment with Packet Interface](http://ebook.pldworld.com/_eBook/ATA%20spec/ATA7_Spec.pdf).

至于代码嘛……如果我每次新增了什么代码都复制一份贴到博客里显然有点多余，显得过于杂乱了。所以劳烦您自行阅读我提交的 source code. 仓库地址在 [前言](#前言) 底部已经给出。

### 进入保护模式

一个新的模式的出现一定是为了取代旧有的模式，它一定是为了解决原先模式的一些缺陷而生的。

实模式是在有了 32-bit CPU 后才提出的，和纯粹的 16-bit CPU，8086 等无关。提出「实模式」的概念只是为了和有了 32-bit CPU 之后诞生的「保护模式」相区分，仅此而已。另外，实模式的运行环境是 16-bit，而保护模式的运行环境是 32-bit.

虽然有了保护模式，但之前实模式下的程序还得兼容，因此在「实模式」和「保护模式」之间还有个过渡模式，即「虚拟 8086」模式。

简单罗列一些实模式下的缺陷：

1. 实模式下操作系统和用户程序处于同一特权级，这哥俩平起平坐，没有区别对待。
2. 用户程序所引用的地址都是指向真实的物理地址，也就是说逻辑地址等于物理地址，实实在在的指哪打哪。
3. 用户程序可以自由修改段基址，可以不亦乐乎地访问所有内存，没人拦得住。
4. 访问超过 64KB 的内存区域时要切换段基址，转来转去容易晕乎。
5. 一次只能运行一个程序，无法充分利用计算机资源。
6. 共 20 条地址总线，最大可用内存为 1MB，这即使在当时也不够用。

前三点属于安全缺陷，第四、五点是使用方面的缺陷，似乎当时还可以勉强忍受一下，但最后一条就是硬伤，随着计算机事业的发展，程序对内存的需求必然越来越大，如果还是 1MB 内存，那真的是束手无策。

CPU 发展到 32-bit 后，地址总线和数据总线也发展到了 32-bit，其寻址空间达到了 $$2^{32} =4294967296$$ 字节，也就是 4GB 范围。寻址空间上去了，寻址方法还是老一套的「段基址:段内偏移地址」，因此如果还是维持 16-bit 的寄存器大小，肯定无法承担 4GB 的寻址重任。因此，保护模式下寄存器宽度也得到了提升，除段寄存器外，通用寄存器、指令指针寄存器和标志寄存器都由原先的 16-bit 扩展到了 32-bit，这样一来，单独的一个寄存器就可以访问到 4GB 空间的每一个角落，段地址可以为 0，开启了「平坦模式」的时代，大大方便了开发者的工作。

至于保护模式中对安全性的改进，主要是体现在段寄存器的用途上面。保护模式建立了 `全局描述符表 (Global Description Table, GDT)` 的概念，其中每一个表项称为段描述符，大小为 8 字节，用来描述各个内存段的起始地址、大小和权限等信息，当有实际动作在这片内存上发生时，CPU 就根据这些属性来检查动作的合法性，从而起到了保护的作用。GDT 存储在内存中，由 `GDTR` 寄存器负责指向这张表的起始位置。这样，原先的段寄存器存放的不再是一个简单的段基址，而是一个叫做 `选择子 (Selector)` 的东西，它相当于一个索引，将从 GDT 中找到对应的段基址，再加上偏移地址，通过这种方式来确定地址。

选择子的结构如下：

<center>
  <img src="https://cdn.jsdelivr.net/gh/CuB3y0nd/IMAGES@master/assets/Untitled-2024-03-31-132221.svg" />
</center>

- `Index` 相当于段描述符的索引值，用此值在 GDT 中索引描述符。由于这部分一共有 13-bits，故可以索引 $$2^{13} =8192$$ 个段。
- `TI (Table Indicator)` 指示使用哪张描述符表，为 0 表示在 GDT 中索引段描述符，为 1 则在 LDT 中索引。
- `RPL (Requested Privilege Level)` 可以表示 0、1、2、3 四种特权级。

而下图就是 GDT 表项的结构了，其中灰色的那位是 `L (Long Mode)` 位，用于指示是 32-bit 还是 64-bit.

<center>
  <img src="https://upload.wikimedia.org/wikipedia/commons/0/0a/SegmentDescriptor.svg" />
</center>

有关不同位的含义，可以参考 [Global Descriptor Table](https://en.wikipedia.org/wiki/Segment_descriptor)，这里不再赘述。

通过上图你也看到了，像是段基址，段界限值，它们都被分割开来了，而不是连续存储的，这导致 CPU 还要对这些七零八落的数据进行重组，拼成一个完整的数据……还有访问内存中的段描述符，这些都需要时间，CPU 可等不起。因此，为了提高获取段信息的效率，将段信息缓存到了 `段描述符缓存 (Segment Descriptor Cache)`。每个段寄存器都有一个 hidden part，叫做段描述符缓存，它只有 CPU 可操作，CPU 每次将历经千辛万苦获取到的段信息整理成完整的、通顺、不蹩脚的形式后，存入段描述符缓存，以后每次访问相同的段时，就直接读取该段寄存器对应的的段描述符缓存。

> [!TIP]
> 虽然段描述符缓存是保护模式下的产物，但也可以用在实模式下。因为每次都将段基址左移 4 位也算一个不小的操作，所以也可以将移位后的结果缓存起来供下次使用。

至于这个缓存的失效时间，还真没个「准」。段描述符缓存不会自动刷新，只有当 CPU 重新加载段寄存器时才会更新。

比如这会刷新缓存：

```asm
mov ax, 0x10
mov ds, ax
```

这样则不会刷新段描述符缓存寄存器：

```asm
mov ax, ds
mov ds, ax
```

因此，除非手动重新加载段寄存器，否则 CPU 会一直使用旧的缓存，即使 GDT/LDT 已被修改。

此外，保护模式下寻址方式也得到了极大的扩展，灵活性得到了极大的提高。基址寄存器不再只能用 BX、BP，而是所有 32-bit 通用寄存器，变址寄存器也一样，不再只是 SI、DI，而是除 ESP 之外的所有 32-bit 通用寄存器。偏移量也从 16-bit 变成了 32-bit，并且，还可以对变址寄存器乘以一个比例因子，不过出于内存对齐的考虑，比例因子只能是 1、2、4、8。

还有一些杂七杂八的，比如指令扩展啦，运行模式反转啦之类的，不过我呀，是写不动了<s>_（改天也不一定会写的）_</s>，有兴趣的自己看书查资料去吧～

最后说说进入保护模式需要做的三件事：

- 加载 GDT
- 打开 A20 Gate
- 将 CR0 的 PE (Protection Enable) 位置 1

这三个步骤可以不顺序，也不连续。至于实现，还是移步我的 GitHub 看实际代码好了，懒得写了……/逃

# 开发日志

- **Mar 12, 2025** Yeeee! 我终于正式写下了 Exordium 的第一行代码<s>（其实是好几行……）</s>。从此，接力棒由 BIOS 传到了 MBR 之手，真是值得庆祝的一刻呢！
- **Mar 17, 2025** TNND 使用 GAS 重构。
- **Mar 19, 2025** 实现了一个简单的 Loader.
- **Mar 20, 2025** 使用 I/O 处理机传送方式优化 in/out 的传送方式。
- **Mar 24, 2025** 吐血，使用 NASM 重构……进入保护模式、GDB 实模式拓展脚本。
- **Apr 2, 2025** 检测可用 RAM 的总大小。

# 书中的勘误

基于 **_《操作系统真象还原》（2022.10 重印）_**。

虽然可能错的是我，但并不妨碍我写出来。欢迎一起讨论～

## 第 0 章：一些你可能正感到迷惑的问题

- **0.2 你想研究到什么程度**

三处 $$4\times 4\times 4$$ 应修改为 $$4+4+4$$。

- **0.15 局部变量和函数参数为什么要放在栈中**

> 栈由于是向下生长的，堆栈框架就是把 esp 指针提前加一个数，原 esp 指针到新 esp 指针之间的栈空间用来存储局部变量。

这里应该说是提前减一个数才对，因为栈是从高地址向低地址生长的，所以创建栈帧是减，清理才是加。

## 第 1 章：部署工作环境

- **1.3 操作系统的宿主环境**

> 在编译中要加 -lpthread 参数。用 vim 编译 makefile，vim 是 Linux 下功能最为强大的文本编辑器。vim Makefile 回车：

此处有个小小的 typo：「用 vim 编译 makefile」应改为「用 vim 编辑 makefile」。

## 第 2 章：编写 MBR 主引导记录，让我们开始掌权

- **2.2 软件接力第一棒，BIOS**

这里存在一个表格内部的 typo，原表格如下：

| 起始  | 结束  | 大小 | 用途                                                                                                                                              |
| ----- | ----- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| FFFF0 | FFFFF | 16B  | BIOS 入口地址，此地址也属于 BIOS 代码，同样属于顶部的 640KB 字节。只是为了强调其入口地址才单独贴出来。此处 16 字节的内容是跳转指令 jmp F000\:E05B |

修改为属于顶部的 64KB 字节而不是 640KB：

| 起始  | 结束  | 大小 | 用途                                                                                                                                             |
| ----- | ----- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| FFFF0 | FFFFF | 16B  | BIOS 入口地址，此地址也属于 BIOS 代码，同样属于顶部的 64KB 字节。只是为了强调其入口地址才单独贴出来。此处 16 字节的内容是跳转指令 jmp F000\:E05B |

## 第 3 章：完善 MBR

- **3.1.3 什么是 vstart**

两处「code.节名.start」应修改为「section.节名.start」。

- **3.2.2 实模式下的寄存器**

还是 typo：「IP 寄存器是不可见寄存器，CS 寄存器是可见寄存器。这两个配合在一起后就是 CPU 的罗盘，它们是给 CPU 导航用的。CPU 执行到何处，完成要听从这两个寄存器的安排。」，「完成」应改成「完全」。

- **3.2.4 实模式下 CPU 内存寻址方式**

直接寻址这里，「第二条指令中，由于使用了段跨越前缀 fs，0x5678 的段基址变成了 gs 寄存器。」这里不应该是 gs 寄存器，而是 fs 寄存器才对。

- **3.2.7 实模式下的 call - 16 位实模式相对近调用**

「指令中的立即数地址可以是被调用的函数名、标号、立即数，函数名同标号一样，它只是地址的人性化表示方法，最终会被编译器转换为一个实际数字地址，如 call near prog_name。」这里「prog_name」应改为同下文一样的「proc_name」。

「这好办，咱们上 bochs 看，让其边执行边反汇编给咱们看结果。下面粗体的文件是我加的注释说明。」这里「文件」应该改成「文字」吧。改成「文字」的话，排版上也存在问题，因为贴出来的额外注释字体并不是呈粗体的。还有一种可能是，作者将 `> (markdown cite syntax)` 引用格式的排版描述为粗体，将引用内容描述成文件，不过这样理解的话也会引出一个争端：引用的内容称为「文件」并不合适，如果一定要用「文件」这个词语的话，我觉得写成「文件内容」更好。

- **3.3.1 CPU 如何与外界设备通信——IO 接口**

「再说，同任何一个设备打交道，CPU 那么速度那么快，它不得嫌弃别人慢吗……」多打了一个「那么」。

- **3.5.3 硬盘控制器端口**

「有些命令需要指定额外参数，这些参数就写在 Fea ture 寄存器中。」这里的问题是「Fea ture」中多打了一个空格，应改成「Feature」。

- **3.6.1 改造 MBR**

「我们的 MBR 受限于 512 字节大小的，在那么小的空间中……」多打了一个「的」。

「在寄存器 eax 中的是待读入的扇区起始地址，赋值后 eax 为定义的宏 LOADER_START\_ SECTOR，即 0x2。」这里「LOADER_START\_ SECTOR」多打了一个空格，应改为「LOADER_START_SECTOR」。

「段内偏移地址正因为是 16 位，只能访问 64KB 的段空间，所以才将段基址乘以 16 来突破这 64KB，从而实现访问低调 1MB 空间的。」这里可能是多打了一个「低调」，也可能是多打了一个「调」。

- **3.6.2 实现内核加载器**

「这次我只抓了一张图，但我人格保证这是跳动的字符……」，「人格」与「人品」是有区别的吧，这里用「人格」感觉并不合适，应该用「人品」 xD

## 第 4 章：保护模式入门

- **4.2.1 保护模式之寄存器扩展**

「其中每一个表项称为段描述符，其大小为 64 字节」，我滴个乖乖，一个表项 64 字节有点虾仁了啊，其实是 64 比特，8 字节。

大麻烦来了，我觉得作者写的描述符缓存寄存器的失效时间的这部分内容存在一点小小的逻辑问题，书上写的「即使新选择子的值和之前段寄存器中老的选择子相同，CPU 就会重新访问全局描述符表，再将获取的段信息重新放回段描述符缓存寄存器」和「在 16 位环境下，无论是否与之前的段基址相同，段基址左移 4 位后的结果就被送入段描述符缓存寄存器」，既然不管有没有改变段寄存器的值都要重新访问 GDT，那缓存的意义何在？对此，我写了下自己的一点拙见，见 [进入保护模式](#进入保护模式) 中有关对缓存失效时间的描述。

- **4.3.1 段描述符**

「内存访问需要用到『段其址:段内偏移地址』……」，是「段地址」吧，怎么打成了「段其址」。

- **4.3.5 让我们进入保护模式**

代码 4-2 中第 27 行：

```asm wrap=false showLineNumbers=false
DESC_VIDEO_HIGH4 equ (0x00 << 24) + DESC_G_4K + DESC_D_32 + \
DESC_L + DESC_AVL + DESC_LIMIT_VIDEO2 + DESC_P + \
DESC_DPL_0 + DESC_S_DATA + DESC_TYPE_D ATA + 0x00
```

`DESC_TYPE_D ATA` 中间多了一个空格，应改为 `DESC_TYPE_DATA`.

同代码 4-2，第 13 行：

```asm wrap=false showLineNumbers=false
DESC_LIMIT_VIDEO2 equ 0000_000000000000000b
```

这里全部置零肯定是有问题的，拼不出段基址 `0xb8000`。应该改成：

```asm wrap=false showLineNumbers=false
DESC_LIMIT_VIDEO2 equ 0000_0000000000001011b
``` -->
