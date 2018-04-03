package com.jfclothshop.util;

import android.os.Handler;
import android.os.HandlerThread;
import android.os.Process;

public class Worker {

    private HandlerThread mWorkerThread;
    private Handler mWorkerHandler;

    public Worker(String threadName) {
        this(threadName, null);
    }

    public Worker(String threadName, Handler.Callback callback) {
        mWorkerThread = new HandlerThread(threadName);
        mWorkerThread.start();
        mWorkerHandler = new Handler(mWorkerThread.getLooper(), callback);
    }

    public void runOnWorkerThread(Runnable r) {
        if (mWorkerThread.getThreadId() == Process.myTid()) {
            r.run();
        } else {
            mWorkerHandler.post(r);
        }
    }

    public Handler getWorkerHandler() {
        return mWorkerHandler;
    }
}
