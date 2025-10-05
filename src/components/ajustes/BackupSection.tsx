import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BackupSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Back up</h2>

      <div className="grid gap-6">
        {/* Generar backup card */}
        <Card>
          <CardHeader>
            <CardTitle>Generar backup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2">Cree un directorio para backup</p>
              <code className="block bg-gray-100 p-2 rounded text-sm">
                mkdir ~/postgres_backup
              </code>
            </div>

            <div>
              <p className="mb-2">
                Obtenga la cadena de conexión del clúster PostgreSQL
              </p>
            </div>

            <div>
              <p className="mb-2">Ejecute el comando pg_dump:</p>
              <code className="block bg-gray-100 p-2 rounded text-sm">
                pg_dump --dbname=&lt;url_coneccion&gt; --format=custom
                --file=~/postgres_backup/backup.dump
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Restaurar datos card */}
        <Card>
          <CardHeader>
            <CardTitle>Restaurar Datos Desde pg_dump</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2">Prepare el directorio de backup</p>
            </div>

            <div>
              <p className="mb-2">
                Obtenga la cadena de conexión del clúster: Copie la cadena de
                conexión del clúster de PostgreSQL objetivo.
              </p>
            </div>

            <div>
              <p className="mb-2">Ejecute el comando pg_restore:</p>
              <code className="block bg-gray-100 p-2 rounded text-sm">
                pg_restore --dbname=&lt;url_coneccion&gt; --clean --create
                ~/postgres_backup/backup.dump
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
