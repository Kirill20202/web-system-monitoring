#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int main() {
    // Запускаем ps aux, сортируем по %CPU (убывание), берём первые 6 строк (1 заголовок + 5 процессов)
    FILE *fp = popen("ps aux --sort=-%cpu | head -6", "r");
    if (!fp) {
        fprintf(stderr, "Failed to run ps command\n");
        return 1;
    }

    char buffer[1024];
    while (fgets(buffer, sizeof(buffer), fp)) {
        // Убираем завершающий \n
        int len = strlen(buffer);
        if (len > 0 && buffer[len-1] == '\n') buffer[len-1] = '\0';
        printf("%s\n", buffer);
    }

    pclose(fp);
    return 0;
}