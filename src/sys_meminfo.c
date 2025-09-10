#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    FILE *fp = fopen("/proc/meminfo", "r");
    if (!fp) {
        fprintf(stderr, "Failed to open /proc/meminfo\n");
        return 1;
    }

    long mem_total = 0, mem_free = 0, mem_available = 0;
    char line[256];

    while (fgets(line, sizeof(line), fp)) {
        if (sscanf(line, "MemTotal: %ld kB", &mem_total) == 1) continue;
        if (sscanf(line, "MemFree: %ld kB", &mem_free) == 1) continue;
        if (sscanf(line, "MemAvailable: %ld kB", &mem_available) == 1) continue;
    }

    fclose(fp);

    // Конвертируем в MB для удобства
    printf("%ld %ld %ld", mem_total / 1024, mem_free / 1024, mem_available / 1024);
    return 0;
}