# Memory Allocation Simulator

[toc]

This is a memory allocation simulator based on paging and virtual memory technology implemented in Vue.js, Element Plus and Tailwindcss.

Tongji SSE Operating System Course Assignment 2.

See Assignment 1 [here](https://github.com/PlusOneZ/OS-Homework-Elevator-Dispatching).

The [github-page](https://plusonez.github.io/OS-Homework-Memory-Allocation/) of this repository is an online deployment of this simulator. Check that out!

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Background Specification

As mentioned before, this simulator simulates the memory access scenario within a paging main memory which supports virtual memory technology. Here are some more detailed restrictions to the simulator's scenario to complete the simulation's background and make the flow of activities more reasonable.

First the simulator's process is allocated fixed sized frames, in the default case, of total amount 4. It cannot access other process's frame, either can other processes access its.

The instructions are generated randomly, given the default rate of jumping forward and backward each 25%, and 50% for sequential execution. You can change the rate to arbitrary number. One important assumption is that **every instruction can be executed only once**, the process exits normally when all the instructions finish.

The RLU-like algorithm is implemented in its industrial substitution: Clock algorithm, the latter has much less hardware requirements and much less overhead.


# User Manual

The simulator runs on your browser, you can run the server locally on your device, or view the online deployment mentioned before.

In whichever way, the successful accessed website in your browser will look like this:

![main.png](https://i.loli.net/2021/06/06/FCTRwNzOQSP3qVm.png)

There are several components you can freely play with:

## The Footer (Control Panel also)

![footer.png](https://i.loli.net/2021/06/06/4ohuaOBtIKkHN1J.png)

This part shows the current running stage of the process, and the parameters that can be personalized. 

Each button's function is written on itself, which needs no more explanation.

By clicking the radio, you can choose to do the replacement either RLU way or FIFO way.

By clicking the following line: "顺序执行....", the simulator pops out its personalization panel:

## Personalization Parameters

<img width='50%' src='https://i.loli.net/2021/06/06/84nOLHwtxaDqjIK.png'>

You can arbitrarily set all of these parameters to simulate memory situation in different scenarios.

Below is a scenario with parameters altered to non-default values:

![preference.png](https://i.loli.net/2021/06/06/7azHOBRDK23V9So.png)

## The Header (Accounting Parts)

The part updates with the running of instructions. Basically counting the existence of **page faults** and calculates the **page fault rate**. Nothing special here.

![header.png](https://i.loli.net/2021/06/06/xvAUY8k6lQL9raF.png)

## Frames panel

I chose to use those glass-like blocks to represent the frames allocated to this process. They're dyed different colors when pages come into frames:

<img width='50%' src='https://i.loli.net/2021/06/06/sgLcdXZwHfuYknO.png'>

Also, when you hover on them, they tell you their status.

The *tick* or *cross* at the left-bottom corner is *Use-bit* used for clock algorithm, and *warning* sign at right-bottom corner means whether the page's data is changed, known as *Modification-bit* in algorithm.

One thing to be noticed is that, the **modification-bits are altered manually**, you have to click on those frames to change the modification state.

## Instruction List

The basic information of the instruction are listed aside in the looooong menu. Since those instructions don't have to have real meanings, they are presented in a mocked-up way. 

Clear visual guidance are given to the 'available' and 'finished' states of the instructions. You can also manually schedule the instruction by click on an available one.

The executed instruction with page fault will be marked red *PF* on its side.

<img width="25%" src='https://i.loli.net/2021/06/06/eQEb5tvdLugom1H.png'>

